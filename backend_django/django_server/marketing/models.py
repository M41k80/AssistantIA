from django.db import models
from django.conf import settings

class EmailRequest(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nombre_negocio = models.CharField(max_length=100)
    producto = models.CharField(max_length=100)
    objetivo = models.CharField(max_length=500)
    tono = models.CharField(max_length=100)
    publico_objetivo = models.CharField(max_length=100)
    email = models.JSONField(blank=True, null=True)
