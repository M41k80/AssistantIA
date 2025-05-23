import os, json, re
from typing import Dict, Any
from dotenv import load_dotenv
from openai import AsyncOpenAI

load_dotenv()


OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
if not OPENROUTER_API_KEY:
    raise RuntimeError(
        "Falta la API Key. Añade OPENROUTER_API_KEY a tu .env o variables de entorno."
    )


REFERER_DOMAIN = os.getenv("OPENROUTER_REFERER", "http://localhost:3000")

client = AsyncOpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1",
)


_JSON_RE = re.compile(r"\{.*\}", re.DOTALL)

def _extract_json(raw: str) -> Dict[str, Any]:
    """
    Intenta decodificar JSON; si falla, usa regex para
    encontrar el primer bloque {...}.
    """
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        match = _JSON_RE.search(raw)
        if match:
            return json.loads(match.group())
        raise ValueError(f"Respuesta sin JSON válido:\n{raw}")


async def ask_model(messages, *, model="mistralai/mistral-7b-instruct",
                    temperature=0.7, max_tokens=512) -> Dict[str, Any]:
    """
    Envía mensajes al modelo y devuelve un dict ya parseado.
    """
    response = await client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature,
        max_tokens=max_tokens,
        extra_headers={
            "HTTP-Referer": REFERER_DOMAIN,
            "X-Title": "AppIAProductividad"
        }
    )
    raw = response.choices[0].message.content.strip()
    print("🌐 IA →", raw)
    return _extract_json(raw)


async def generate_email_json(prompt: str) -> Dict[str, Any]:
    """
    Llama al modelo con un prompt y fuerza salida JSON.
    """
    messages = [
        {"role": "system",
            "content": (
            "Eres un experto copywriter. "
            "Responde únicamente con un objeto JSON válido y nada más."
            )},
        {"role": "user", "content": prompt}
    ]
    return await ask_model(messages)
