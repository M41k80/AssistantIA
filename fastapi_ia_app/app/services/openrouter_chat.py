import re, json, os
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("OPENROUTER_API_KEY")
if not api_key:
    raise RuntimeError("Falta la API Key: revisa tu .env y la variable OPENROUTER_API_KEY")

client = AsyncOpenAI(
    api_key=api_key,
    base_url="https://openrouter.ai/api/v1",
)


async def query_mistral(prompt: str, *, mode: str = "chat") -> str | dict:
    """
    mode="chat" -> texto conversacional (Markdown permitido)
    mode="json" -> devuelve dict con la respuesta JSON
    """
    if mode not in {"chat", "json"}:
        raise ValueError("mode debe ser 'chat' o 'json'")

    system_prompt = (
        "Eres un asistente útil y conversacional. "
        "Responde con claridad."
        if mode == "chat" else
        "Eres un asistente que responde ÚNICAMENTE un objeto JSON válido. "
        "No agregues texto, explicaciones ni marcas Markdown."
    )

    user_content = prompt
    if mode == "json":
        user_content += (
            "\n\nPor favor responde solo con un JSON válido, ejemplo:\n"
            "{\n  \"respuesta_ia\": \"texto aquí\"\n}"
        )

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user",   "content": user_content},
    ]

    response = await client.chat.completions.create(
        model="mistralai/mistral-7b-instruct",
        messages=messages,
        temperature=0.7,
        max_tokens=1024,
        extra_headers={
    "HTTP-Referer": os.getenv("OPENROUTER_REFERER", "http://localhost:3000"),
    "X-Title": "AppIAProductividad"
}

    )

    content = response.choices[0].message.content.strip()
    print("Respuesta IA cruda:", repr(content))

  
    if mode == "json":
        try:
            return json.loads(content)
        except json.JSONDecodeError:
            # Buscamos la primera estructura {...}
            match = re.search(r'\{.*\}', content, re.DOTALL)
            if match:
                return json.loads(match.group())
            raise ValueError("La respuesta no contiene JSON válido.")
    else:
        
        return content
