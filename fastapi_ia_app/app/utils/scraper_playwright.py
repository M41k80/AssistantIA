from playwright.async_api import async_playwright
import re

async def extraer_datos_desde_url_async(url: str) -> dict:
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.goto(url, wait_until="networkidle")
            content = await page.content()
            await browser.close()

        # Extraer texto para regex
        from bs4 import BeautifulSoup
        soup = BeautifulSoup(content, "html.parser")
        texto = soup.get_text()

        # Emails
        emails_texto = re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", texto)
        emails = list(set(emails_texto))

        # Teléfonos
        telefonos = re.findall(r"(\+?\d{1,3}[\s\-]?)?(\(?\d{2,4}\)?[\s\-]?)?[\d\s\-]{5,15}\d", texto)
        telefonos = [''.join(t).strip() for t in telefonos]
        telefonos = list(set(telefonos))

        return {
            "emails": emails,
            "telefonos": telefonos,
        }

    except Exception as e:
        return {"error": str(e)}
