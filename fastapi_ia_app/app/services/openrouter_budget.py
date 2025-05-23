import os
from dotenv import load_dotenv
from openai import AsyncOpenAI
import json

load_dotenv()

api_key = os.getenv("OPENROUTER_API_KEY")
if not api_key:
    raise RuntimeError("Falta la API Key: revisa tu .env y la variable OPENROUTER_API_KEY")

client = AsyncOpenAI(
    api_key=api_key,
    base_url="https://openrouter.ai/api/v1",
)

async def query_mistral(prompt: str) -> dict:
    messages = [
        {"role": "system", "content": "Eres un asistente que responde SOLO JSON válido, sin explicaciones ni texto adicional."},
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
    print("Respuesta IA cruda:", repr(content))  # Esto te ayuda a ver qué está llegando

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        # Intentar extraer JSON del contenido usando regex
        match = re.search(r'\{.*\}', content, re.DOTALL)
        if match:
            try:
                return json.loads(match.group())
            except json.JSONDecodeError:
                pass
        raise ValueError(f"No se pudo decodificar JSON válido de la respuesta: {content}")
