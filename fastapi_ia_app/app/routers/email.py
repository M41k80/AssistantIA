from fastapi import APIRouter, HTTPException
from app.schemas.email import EmailRequest
from app.services.email_service import generar_email

router = APIRouter()

@router.post("/generate-email")
async def generate_email(req: EmailRequest):
    try:
        if not all([req.nombre_negocio, req.producto, req.tono, req.publico_objetivo]):
            raise HTTPException(status_code=400, detail="Faltan campos requeridos")

        
        resultado = await generar_email(req)

        return resultado  

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
