from app.services.openrouter import query_mistral
from app.schemas.budget import BudgetResponse

PROMPT_FIJO = """
Eres un asesor financiero. Devuelve **SIEMPRE** un objeto JSON EXACTAMENTE con esta forma:

{
    "plan_ahorro": {
        "cantidad": <float>,
        "porcentaje_ingresos": <float>
    },
    "recomendaciones": [<string>, ...],
    "distribucion": {
        "<categoria>": <float>  // Representa el porcentaje del ingreso total (0 a 100)
    }
}

Reglas:
- El total de la distribución no debe superar el 100%.
- Los porcentajes deben basarse en los ingresos totales.
- Redondea a 2 decimales.
- Nunca incluyas porcentajes mayores a 100% por categoría.
"""

async def calcular_presupuesto(request) -> BudgetResponse:
    gastos_txt = "\n".join(
        f"- {g.categoria}: {g.monto} USD{f' ({g.descripcion})' if g.descripcion else ''}"
        for g in request.gastos
    )

    prompt = (
        PROMPT_FIJO
        + f"""

Ingresos mensuales: {request.ingresos} USD
Gastos:
{gastos_txt or 'Ninguno'}
Meta de ahorro: {request.metas_ahorro} USD
"""
    )

    bruto = await query_mistral(prompt)

    distribucion = bruto.get("distribucion", {})
    for categoria, valor in distribucion.items():
        if isinstance(valor, (int, float)) and valor > 100:
            raise ValueError(f"Porcentaje inválido en '{categoria}': {valor} > 100%")

    # ——— Normalizar por si el modelo devolviera una lista ———
    if isinstance(bruto, list) and bruto:
        bruto = bruto[0]

    try:
        return BudgetResponse(**bruto)
    except Exception as e:
        # Lanza 422 y registra el problema
        from fastapi import HTTPException
        raise HTTPException(
            status_code=422,
            detail=f"Formato de respuesta del modelo inválido: {e}. Recibido: {bruto}"
        )
