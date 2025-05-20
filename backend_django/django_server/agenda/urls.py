from django.urls import path
from agenda.views import (
    ListCreateTareaView,
    RetrieveUpdateDestroyTareaView,
    ListEventoView,
    RetrieveUpdateDestroyEventoView,
    CrearTareaYEventoView,
    ToggleEventoView
)

app_name = 'agenda'
urlpatterns = [
    # Tareas
    path('tareas/', ListCreateTareaView.as_view(), name='tarea-list-create'),
    path('tareas/<int:pk>/', RetrieveUpdateDestroyTareaView.as_view(), name='tarea-detail'),

    # Eventos
    path('eventos/', ListEventoView.as_view(), name='evento-list'),
    path('eventos/<int:pk>/', RetrieveUpdateDestroyEventoView.as_view(), name='evento-detail'),

    path('crear-evento/', CrearTareaYEventoView.as_view(), name='evento-create'),
    path('eventos/<int:pk>/toggle/', ToggleEventoView.as_view(), name='evento-toggle'),

]