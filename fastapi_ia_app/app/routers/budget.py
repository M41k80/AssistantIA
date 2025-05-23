from fastapi import APIRouter
from typing import List, Optional
from pydantic import BaseModel, Field
from app.services.budget_service import calcular_presupuesto
from app.schemas.budget import BudgetResponse

router = APIRouter()

class Gasto(BaseModel):
    categoria: str
    descripcion: Optional[str] = None
    monto: float = Field(gt=0)

class BudgetRequest(BaseModel):
    ingresos: float = Field(gt=0)
    gastos: List[Gasto]
    metas_ahorro: float = Field(ge=0)

@router.post("/plan", response_model=BudgetResponse)
async def budget_plan(request: BudgetRequest):
    plan = await calcular_presupuesto(request)
    return plan
