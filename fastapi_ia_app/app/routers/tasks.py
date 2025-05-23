from datetime import datetime, timedelta, time
from typing import List, Optional

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field, validator

from app.services.openrouter import query_mistral

router = APIRouter()


URGENCIA_A_MIN_PRIORITY = {1: "Baja", 2: "Baja", 3: "Media", 4: "Alta", 5: "Alta"}
PRIORITY_ORDER = {"Baja": 1, "Media": 2, "Alta": 3}


def ajustar_prioridad(urgencia: int, prioridad_ia: str) -> str:
    """Nunca permitir que la prioridad quede por debajo del mínimo según urgencia."""
    prioridad = (prioridad_ia or "Media").capitalize()
    if prioridad not in PRIORITY_ORDER:
        prioridad = "Media"
    prioridad_min = URGENCIA_A_MIN_PRIORITY[urgencia]
    return prioridad if PRIORITY_ORDER[prioridad] >= PRIORITY_ORDER[prioridad_min] else prioridad_min


def huecos_libres(eventos: List["Event"], fecha: str,
                    inicio_jornada: time, fin_jornada: time) -> List[tuple]:
    """Huecos (inicio, fin) libres ordenados de la jornada indicada."""
    fecha_dt = datetime.strptime(fecha, "%Y-%m-%d").date()
    start_day = datetime.combine(fecha_dt, inicio_jornada)
    end_day   = datetime.combine(fecha_dt, fin_jornada)

    eventos_dia = sorted(
        [e for e in eventos if e.inicio.date() == fecha_dt],
        key=lambda e: e.inicio
    )

    huecos, cursor = [], start_day
    for ev in eventos_dia:
        if ev.inicio > cursor:
            huecos.append((cursor, ev.inicio))
        cursor = max(cursor, ev.fin)
    if cursor < end_day:
        huecos.append((cursor, end_day))
    return huecos


def colisiona(horario: tuple, eventos: List["Event"]) -> bool:
    """True si (inicio, fin) se solapa con algún evento."""
    ini, fin = horario
    return any(max(ini, e.inicio) < min(fin, e.fin) for e in eventos)


class Task(BaseModel):
    titulo: str
    descripcion: str
    fecha_limite: str                       
    urgencia: int = Field(ge=1, le=5)
    habitos: str
    duracion_minutos: int = Field(gt=0)

class Event(BaseModel):
    titulo: str
    descripcion: Optional[str] = None
    inicio: datetime
    fin: datetime
    prioridad: str

    @validator("fin")
    def fin_posterior(cls, v, values):
        if "inicio" in values and v <= values["inicio"]:
            raise ValueError("fin debe ser posterior a inicio")
        return v

class PrioritizeRequest(BaseModel):
    task: Task
    eventos: Optional[List[Event]] = []



@router.post("/prioritize")
async def priorizar_tarea(data: PrioritizeRequest):
    task, eventos = data.task, data.eventos or []

    
    jornada_ini, jornada_fin = time(6, 0), time(22, 0)
    libres = huecos_libres(eventos, task.fecha_limite, jornada_ini, jornada_fin)

    dur = timedelta(minutes=task.duracion_minutos)
    primer_hueco = next(((ini, ini + dur) for ini, fin in libres if fin - ini >= dur), None)

    if not primer_hueco:
        # Agenda llena
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="No hay hueco libre en la agenda para ese dia."
        )

    hueco_txt = f"{primer_hueco[0]:%H:%M} - {primer_hueco[1]:%H:%M}"
    eventos_str = "\n".join(
        f"- {e.inicio:%H:%M} a {e.fin:%H:%M}" for e in eventos if e.inicio.date() == primer_hueco[0].date()
    ) or "Sin eventos ese día"

    # 2️⃣   Prompt a la IA
    prompt = f"""
Eres un asistente que responde SOLO en JSON:
{{
    "prioridad": "Alta" | "Media" | "Baja",
    "horario": "HH:mm - HH:mm"
}}
Tarea:
Título: {task.titulo}
Descripción: {task.descripcion}
Fecha límite: {task.fecha_limite}
Urgencia (1-5): {task.urgencia}
Duración: {task.duracion_minutos} min

Hábitos del usuario:
{task.habitos}

Eventos confirmados:
{eventos_str}

Debes proponer un horario DENTRO de: {hueco_txt}
No añadas explicaciones.
"""
    respuesta = await query_mistral(prompt)
    horario_txt = respuesta.get("horario", hueco_txt)
    prioridad_final = ajustar_prioridad(task.urgencia, respuesta.get("prioridad"))

    # 3️⃣   Parseamos y comprobamos colisiones
    try:
        ini_str, fin_str = [h.strip() for h in horario_txt.split("-")]
        ini = datetime.strptime(f"{task.fecha_limite} {ini_str}", "%Y-%m-%d %H:%M")
        fin = datetime.strptime(f"{task.fecha_limite} {fin_str}", "%Y-%m-%d %H:%M")
    except Exception:
        # Fallback al primer hueco válido
        ini, fin = primer_hueco

    if colisiona((ini, fin), eventos):
        raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="La IA devolvió un horario que colisiona con eventos existentes."
        )

    nuevo_evento = Event(
        titulo=task.titulo,
        descripcion=task.descripcion,
        inicio=ini,
        fin=fin,
        prioridad=prioridad_final,
    )

    return {"evento": nuevo_evento.dict()}
