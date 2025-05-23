# app/main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.status import HTTP_422_UNPROCESSABLE_ENTITY

from app.routers import tasks, email, chat, budget, scraper  

app = FastAPI(
    title="API Inteligente: tareas, presupuestos, e-mails, scraping y chat IA",
    description=(
        "• Priorización de tareas según hábitos\n"
        "• Generador de e-mails de marketing\n"
        "• Planificador de presupuesto con IA\n"
        "• Chat asistente\n"
        "• Scraping de leads (e-mail/teléfono)"
    ),
    version="0.0.1",
    contact={"name": "404 Not Founders", "email": "m41k80@icloud.com"},
)

# ──────────────────────────────  CORS  ──────────────────────────────
origins = [
    "http://localhost:8000",          # Django local
    "https://tu-dominio-django.com",  # Django prod
    "http://localhost:3000",          # Frontend React local
    " https://express4-k8bz.onrender.com", # Django prod
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ───────────────────────────  Routers  ──────────────────────────────
app.include_router(tasks.router,   prefix="/tasks",   tags=["tasks"])
app.include_router(email.router,   prefix="/emails",  tags=["emails"])
app.include_router(chat.router,    prefix="/chat",    tags=["chat"])
app.include_router(budget.router, prefix="/budget",  tags=["budget"])
app.include_router(scraper.router, prefix="/scraper", tags=["scraper"])

# ─────────────────────  Manejador de error 422  ─────────────────────
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errores = [
        " → ".join(map(str, e["loc"][1:])) + f": {e['msg']}"
        for e in exc.errors()
    ]
    return JSONResponse(
        status_code=HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "detail": "Datos inválidos en la solicitud.",
            "errores": errores,
            "ejemplo_correcto": {
                "ingresos": 3500,
                "gastos": [
                    {"categoria": "Alquiler", "monto": 900},
                    {"categoria": "Comida", "monto": 450}
                ],
                "metas_ahorro": 700
            }
        },
    )

# ─────────────────────────────  Root  ───────────────────────────────
@app.get("/")
def root():
    return {"msg": "API Inteligente activa"}



