import requests
from bs4 import BeautifulSoup
import re

def extraer_datos_desde_url(url: str) -> dict:
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")
        texto = soup.get_text()

        # Emails en texto
        emails_texto = re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", texto)
        
        # Emails en enlaces mailto
        mailto_links = [a['href'][7:] for a in soup.find_all('a', href=True) if a['href'].startswith('mailto:')]
        
        emails = list(set(emails_texto + mailto_links))

        # Teléfonos (varios formatos comunes)
        telefonos = re.findall(r"(\+?\d{1,3}[\s\-]?)?(\(?\d{2,4}\)?[\s\-]?)?[\d\s\-]{5,15}\d", texto)
        telefonos = [''.join(t).strip() for t in telefonos]
        telefonos = list(set(telefonos))

        # Redes sociales: buscando enlaces a dominios comunes
        redes_sociales = {
            "facebook": [],
            "twitter": [],
            "instagram": [],
            "linkedin": []
        }
        for a in soup.find_all('a', href=True):
            href = a['href'].lower()
            if "facebook.com" in href:
                redes_sociales["facebook"].append(href)
            elif "twitter.com" in href:
                redes_sociales["twitter"].append(href)
            elif "instagram.com" in href:
                redes_sociales["instagram"].append(href)
            elif "linkedin.com" in href:
                redes_sociales["linkedin"].append(href)
        # Evitar duplicados
        for key in redes_sociales:
            redes_sociales[key] = list(set(redes_sociales[key]))

        # Filtrar textos irrelevantes y obtener nombres con heurística simple
        textos = [t.strip() for t in texto.split('\n') if len(t.strip()) > 3]
        # Filtrar textos que no son muy comunes en nombres
        filtros = ['error', 'python', 'submit', 'news', 'help', 'legal', 'docs', 'site', 'contact', 'about']
        nombres = [t for t in textos if all(filtro not in t.lower() for filtro in filtros)]
        nombres = list(set(nombres))

        return {
            "emails": emails,
            "telefonos": telefonos,
            "redes_sociales": redes_sociales,
            "nombres": nombres
        }

    except Exception as e:
        return {"error": str(e)}
