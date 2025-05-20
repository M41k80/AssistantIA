from rest_framework import serializers
from datetime import datetime, time
from .models import Tarea, Evento
from django.utils import timezone

from rest_framework import serializers

class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        read_only_fields = ['created_at', 'updated_at']
        exclude = ['user']

    def validate_fecha_limite(self, value):
        value = value.replace(hour=23, minute=59, second=59)

        if value < timezone.now():
            raise serializers.ValidationError("La fecha límite no puede estar en el pasado.")
        return value

    def validate_duracion_minutos(self, value):
        if value > 1440:
            raise serializers.ValidationError("La duración no puede ser mayor a 24 horas.")
        return value


class EventoSerializer(serializers.ModelSerializer):
    titulo = serializers.CharField(source='tarea.titulo', read_only=True)
    descripcion = serializers.CharField(source='tarea.descripcion', read_only=True)
    # inicio = serializers.SerializerMethodField()
    # fin = serializers.SerializerMethodField()

    class Meta:
        model = Evento
        fields = ['id', 'inicio', 'fin', 'prioridad', 'tarea', 'titulo', 'descripcion', 'finalizado']
        read_only_fields = ['created_at', 'updated_at', 'finalizado']

    # def get_inicio(self, obj):
    #     return obj.inicio.replace(tzinfo=None).isoformat(timespec='seconds')

    # def get_fin(self, obj):
    #     return obj.fin.replace(tzinfo=None).isoformat(timespec='seconds')

    def validate(self, data):
        inicio = data.get('inicio')
        fin = data.get('fin')
        if inicio and fin and fin <= inicio:
            raise serializers.ValidationError("El campo 'fin' debe ser posterior a 'inicio'.")
        return data
    
    def validate_tarea(self, value):
        if Evento.objects.filter(tarea=value).exists():
            raise serializers.ValidationError("Esta tarea ya tiene un evento asignado.")
        return value
    
    def validate_tarea(self, value):
        request = self.context.get('request')
        if Evento.objects.filter(tarea=value).exclude(pk=getattr(self.instance, 'pk', None)).exists():
            raise serializers.ValidationError("Esta tarea ya tiene un evento.")
        if value.user != request.user:
            raise serializers.ValidationError("No tenés permiso para usar esta tarea.")
        return value