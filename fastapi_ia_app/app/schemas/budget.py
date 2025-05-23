from pydantic import BaseModel, Field
from typing import List, Dict, Any

class PlanAhorro(BaseModel):
    cantidad: float
    porcentaje_ingresos: float

class BudgetResponse(BaseModel):
    plan_ahorro: PlanAhorro
    recomendaciones: List[str] = Field(default_factory=list)
    distribucion: Dict[str, Any] = Field(
        description="Porcentaje o monto recomendado por categoría"
    )
