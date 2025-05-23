import os
from dotenv import load_dotenv
from openai import AsyncOpenAI
import json

load_dotenv()

api_key = os.getenv("OPENROUTER_API_KEY")  
if not api_key:
    raise RuntimeError("Falta la API Key: revisa tu .env y la variable OPENROUTER_KEY")

client = AsyncOpenAI(
    api_key=api_key,
    base_url="https://openrouter.ai/api/v1",
)


async def query_mistral(prompt: str) -> dict:
    messages = [
        {"role": "system", "content": "Eres un asistente de productividad experto en gestión de tareas. Devuelve siempre tu respuesta en formato JSON, sin explicaciones."},
        {"role": "user", "content": prompt}
    ]

    response = await client.chat.completions.create(
        model="mistralai/mistral-7b-instruct",
        messages=messages,
        temperature=0.7,
        max_tokens=1024,
        extra_headers={
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "AppIAProductividad"
        },
    )

    content = response.choices[0].message.content.strip()

    try:
        # Intenta decodificar como JSON directamente
        return json.loads(content)
    except json.JSONDecodeError:
        # Si viene como string embebido, intenta una segunda conversión
        return json.loads(json.loads(f'"{content}"'))  # desescapar
