from app.schemas.email import EmailRequest
from app.services.openrouter_email import generate_email_json
from app.services.huggingface_image import generate_marketing_image

_PROMPT_TEMPLATE = """
Genera un e-mail de marketing. Devuelve SOLO un JSON con las claves:
`subject` (string), `preview` (string de 40-60 caracteres), `body` (HTML minimal),
`cta` (string).

Requisitos:
• Tono: {tono}
• Objetivo: {objetivo}
• Público: {publico}
• Longitud cuerpo: ≤ 180 palabras
• Incluir 2 beneficios claros y un CTA al final.
• Usa saludo personalizado con “Hola {{nombre}}” (plantilla).
• No pongas saltos de línea fuera del JSON.
• Usa etiquetas básicas <p>, <strong>, <ul>, <li>.
Negocio: {negocio}
Producto / servicio: {producto}
"""

async def generar_email(request: EmailRequest):
    prompt_email = _PROMPT_TEMPLATE.format(
        tono=request.tono,
        objetivo=request.objetivo,
        publico=request.publico_objetivo,
        negocio=request.nombre_negocio,
        producto=request.producto
    )

    email_data = await generate_email_json(prompt_email)

    prompt_image = f"Imagen promocional creativa y atractiva para: {request.producto}, estilo profesional, fondo blanco, ideal para campaña de marketing"
    image_url = await generate_marketing_image(
    nombre_negocio=request.nombre_negocio,
    producto=request.producto,
    tono=request.tono,
    publico_objetivo=request.publico_objetivo
)



    return {
        "email": email_data,
        "image": image_url
    }
