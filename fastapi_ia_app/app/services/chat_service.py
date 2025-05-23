from app.services.openrouter import query_mistral

async def chat_assistant(mensaje: str):
    prompt = f"Eres un asistente IA amigable. Responde a este mensaje: {mensaje}. Devuelve la respuesta en JSON con clave 'respuesta'."
    respuesta = await query_mistral(prompt)
    return respuesta.get("respuesta", "No se generó respuesta")
