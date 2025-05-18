from django.urls import path, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Configuración de Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="""
            API Inteligente para Tareas, Calculadora de gastos, 
            generador de emails de marketing ,Leads y Scraping y tu 
            ayudante IA
        """,
        default_version='v1',
        description="""
            Esta API permite crear Tareas y la IA basandose en tus 
            habitos pondra la prioridad a esas tareas, podras generar 
            emails de marketing,calcular tus gatos y podras ponerte metas 
            que la IA te ayudara a conseguir para tener una mejor salud 
            financiera,tendras un chat con tu ayudate IA y podras extraer 
            datos de un sitio web para poder hacer scraping y tener un leads
        """,
        contact=openapi.Contact(email="contacto@tusitio.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # URLs de Swagger
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
