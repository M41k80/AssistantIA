from fastapi import FastAPI, APIRouter, UploadFile, File
from fastapi.responses import JSONResponse, FileResponse
import csv
import re
import asyncio
import uuid
import os
from urllib.parse import urljoin
import random
import tldextract

app = FastAPI()
router = APIRouter()

# Configuración de carpetas
CSV_FOLDER = "./csv_leads"
os.makedirs(CSV_FOLDER, exist_ok=True)

# Lista de nombres y dominios para datos ficticios
NOMBRES = [
    "Ana", "Carlos", "María", "José", "Laura", "Miguel", "Sofía", "David", "Lucía", "Juan",
    "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Isabella", "James", "Sophia", "Benjamin"
] * 5  # 100 nombres

DOMINIOS_GENERALES = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"]

# ---- Funciones auxiliares ----
def filtrar_telefonos(texto: str):
    """Función mock (no se usa, pero se mantiene por compatibilidad)"""
    return [f"+{random.randint(1, 99)} {random.randint(100, 999)} {random.randint(1000, 9999)}"]

def extraer_nombre_empresa_desde_url(url: str) -> str:
    """Extrae el nombre de la empresa desde la URL (ej: 'google' de 'https://google.com')"""
    ext = tldextract.extract(url)
    return ext.domain if ext.domain else "empresa"

def generar_email_empresa(nombre_empresa: str) -> list:
    """Genera emails corporativos ficticios"""
    return [
        f"contacto@{nombre_empresa}.com",
        f"info@{nombre_empresa}.com",
        f"ventas@{nombre_empresa}.com",
        random.choice(NOMBRES).lower() + f"@{nombre_empresa}.com"
    ]

def generar_email_aleatorio() -> str:
    """Genera un email personal aleatorio"""
    nombre = random.choice(NOMBRES).lower()
    apellido = ''.join(random.choices('abcdefghijklmnopqrstuvwxyz', k=5))
    dominio = random.choice(DOMINIOS_GENERALES)
    return f"{nombre}.{apellido}@{dominio}"

# ---- Endpoint principal ----
async def extraer_datos_desde_url_async(url: str) -> dict:
    """Genera datos ficticios basados en la URL (sin scraping real)"""
    try:
        nombre_empresa = extraer_nombre_empresa_desde_url(url)
        
        # Datos básicos
        datos = {
            "url": url,
            "titulo": f"Sitio web de {nombre_empresa.capitalize()}",
            "h1": f"Bienvenido a {nombre_empresa.capitalize()}",
            "meta_description": f"Descubre los servicios de {nombre_empresa.capitalize()} para tu negocio.",
            "emails": generar_email_empresa(nombre_empresa),
            "telefonos": [f"+{random.randint(1, 99)} {random.randint(100, 999)} {random.randint(1000, 9999)}"],
            "redes_sociales": {
                "facebook": [f"https://facebook.com/{nombre_empresa}"],
                "twitter": [f"https://twitter.com/{nombre_empresa}"],
                "instagram": [f"https://instagram.com/{nombre_empresa}"],
                "linkedin": [f"https://linkedin.com/company/{nombre_empresa}"],
            },
            "categoria": random.choice(["Restaurante", "Tienda", "Servicios", "General"])
        }
        
        # Añade 2-3 emails aleatorios adicionales
        if random.random() > 0.5:
            datos["emails"].extend([generar_email_aleatorio() for _ in range(random.randint(1, 3))])
        
        return datos
        
    except Exception as e:
        return {"url": url, "error": str(e)}

@router.post("/upload")
async def scrape_csv_upload(file: UploadFile = File(...)):
    """Procesa un CSV con URLs y devuelve un CSV con datos ficticios"""
    try:
        content = await file.read()
        lines = content.decode("utf-8").splitlines()
        reader = csv.DictReader(lines)
        urls = [row['url'] for row in reader if row.get('url')]
        
        # Genera datos ficticios para cada URL
        resultados = await asyncio.gather(*[extraer_datos_desde_url_async(url) for url in urls])
        
        # Guarda el CSV
        csv_filename = f"leads_{uuid.uuid4().hex}.csv"
        csv_path = os.path.join(CSV_FOLDER, csv_filename)
        
        with open(csv_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=[
                "url", "titulo", "h1", "meta_description", "emails", "telefonos", 
                "categoria", "facebook", "twitter", "instagram", "linkedin"
            ])
            writer.writeheader()
            for r in resultados:
                writer.writerow({
                    "url": r.get("url", ""),
                    "titulo": r.get("titulo", ""),
                    "h1": r.get("h1", ""),
                    "meta_description": r.get("meta_description", ""),
                    "emails": ", ".join(r.get("emails", [])),
                    "telefonos": ", ".join(r.get("telefonos", [])),
                    "categoria": r.get("categoria", ""),
                    "facebook": ", ".join(r.get("redes_sociales", {}).get("facebook", [])),
                    "twitter": ", ".join(r.get("redes_sociales", {}).get("twitter", [])),
                    "instagram": ", ".join(r.get("redes_sociales", {}).get("instagram", [])),
                    "linkedin": ", ".join(r.get("redes_sociales", {}).get("linkedin", [])),
                })
        
        return JSONResponse({
            "resultados": resultados,
            "download_url": f"/download/{csv_filename}"
        })
        
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@router.get("/download/{filename}")
async def download_csv(filename: str):
    """Descarga el CSV generado"""
    file_path = os.path.join(CSV_FOLDER, filename)
    if not os.path.exists(file_path):
        return JSONResponse(status_code=404, content={"error": "Archivo no encontrado"})
    return FileResponse(file_path, filename=filename)

app.include_router(router)