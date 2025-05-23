import os
import httpx
from dotenv import load_dotenv
from base64 import b64encode


load_dotenv()

HF_API_KEY = os.getenv("HF_API_KEY")
if not HF_API_KEY:
    raise RuntimeError("Falta HF_API_KEY en .env")

HF_MODEL = os.getenv("HF_IMAGE_MODEL", "stabilityai/stable-diffusion-xl-base-1.0")

async def generate_marketing_image(
    nombre_negocio: str,
    producto: str,
    tono: str,
    publico_objetivo: str
) -> str:
    prompt = (
        f"Marketing image for {producto}, in a {tono} style, targeting {publico_objetivo}. "
        f"Clean background, modern, relevant to {nombre_negocio}."
    )

    headers = {
        "Authorization": f"Bearer {HF_API_KEY}",
        "Content-Type": "application/json"
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"https://api-inference.huggingface.co/models/{HF_MODEL}",
            headers=headers,
            json={"inputs": prompt},
            timeout=60
        )

    if response.status_code != 200:
        raise RuntimeError(f"Error HuggingFace [{response.status_code}]: {response.text}")

    content_type = response.headers.get("content-type", "")
    if "image" in content_type:
        img_data = b64encode(response.content).decode("utf-8")
        return f"data:image/png;base64,{img_data}"

    raise RuntimeError(f"Respuesta inesperada de Hugging Face: {response.text}")
