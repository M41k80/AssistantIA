from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator

CATEGORIA_ML = 500

class Gasto(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    monto = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.01)])
    categoria = models.CharField(max_length=CATEGORIA_ML)
    descripcion = models.TextField(blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)

class Ingreso(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    monto = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.01)])
    fuente = models.CharField(max_length=CATEGORIA_ML, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)

class Presupuesto(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ingresos = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.01)])
    gastos = models.ManyToManyField(Gasto)
    metas_ahorro = models.DecimalField(max_digits=10, decimal_places=2)
    plan = models.JSONField(blank=True, null=True)
