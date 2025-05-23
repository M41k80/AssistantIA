from fastapi import APIRouter
from pydantic import BaseModel
from app.services.openrouter_chat import query_mistral

router = APIRouter()

class ChatRequest(BaseModel):
    mensaje: str

@router.post("/assist")
async def assist_chat(request: ChatRequest):
    respuesta = await query_mistral(request.mensaje)
    return {"respuesta_ia": respuesta}
