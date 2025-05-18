from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator

TITULO_ML = 100
DESCRIPCION_ML = 500

class Tarea(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=TITULO_ML)
    descripcion = models.TextField(max_length=DESCRIPCION_ML, blank=True, null=True)
    fecha_limite = models.DateTimeField()
    duracion_minutos = models.IntegerField(validators=[MinValueValidator(1)])
    urgencia = models.IntegerField(default=3, validators=[MinValueValidator(1),MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Evento(models.Model):
    PRIORIDADES = [
        ('Baja', 'Baja'),
        ('Media', 'Media'),
        ('Alta', 'Alta'),
    ]

    tarea = models.OneToOneField(Tarea, on_delete=models.CASCADE)
    inicio = models.DateTimeField()
    fin = models.DateTimeField()
    prioridad =  models.CharField(default='Media', choices=PRIORIDADES)
  