# AssistantIA 🤖

<img src="frontend/public/assistantia.png" alt="AssistantIA logo" width="400"/>

**AssistantIA** es una plataforma todo-en-uno potenciada por inteligencia artificial que ayuda a los usuarios a optimizar su día a día. Desde la gestión de tareas, generación de correos, scraping web inteligente, hasta la planificación financiera, AssistantIA combina múltiples utilidades en una experiencia simple y eficiente.

## 🚀 Funcionalidades Principales

### ✅ Gestión de Tareas Inteligente
- Crea tareas con urgencia, duración, hábitos y fecha límite.
- Obtén sugerencias personalizadas basadas en tus hábitos y prioridades.
- Planificación automatizada de eventos.

### 📬 Generador de Correos de Marketing con IA
- Crea campañas de email personalizadas usando IA (Mistral 7B).
- Configura tono, objetivo, segmento y mensaje base.
- Exporta en formato HTML o texto.

### 🕸️ Web Scraper Inteligente
- Sube un archivo CSV con URLs.
- Extrae automáticamente:
  - Títulos, descripciones, `h1`
  - Correos, teléfonos y redes sociales
- Descarga resultados como archivo CSV.

### 💰 Calculadora de Gastos con Visualización
- Ingresa tus gastos diarios por categoría.
- Visualiza estadísticas con gráficos interactivos (Recharts).
- Analiza tu salud financiera mensual y anual.

### 📊 Dashboard Personalizado
- Visualización en tiempo real de tareas, finanzas y progreso.
- Integración con múltiples componentes como cards, gráficas y sugerencias generadas por IA.

## 🧠 Tecnología

- **Frontend:** Next.js 15, TailwindCSS, TypeScript
- **Backend:** FastAPI, Supabase (Auth & DB), OpenRouter API (Mistral-7B), Django Rest,
- **IA:** Generación de contenido y planificación inteligente vía modelos LLM
- **Gráficos:** Recharts
- **Scraping:** FastAPI + BeautifulSoup + Pandas

## 📸 Capturas

<img src="/assistantia.png" alt="Logo de AssistantIA" width="200"/>

## 🛠️ Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/M41k80/assistantia.git

# Instalar dependencias
cd assistantia
npm install

# Ejecutar en modo desarrollo
npm run dev
