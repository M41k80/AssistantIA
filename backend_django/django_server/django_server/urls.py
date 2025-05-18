from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.decorators.cache import never_cache
from django.views.generic import TemplateView
from django_server.swagger import urls as swagger_urls


# Vista que devuelve index.html
index_view = never_cache(TemplateView.as_view(template_name="index.html"))

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('', include('agenda.urls')),
    path('', include('presupuesto.urls')),
    path('', include('marketing.urls')),
    path('', include(swagger_urls)),

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)