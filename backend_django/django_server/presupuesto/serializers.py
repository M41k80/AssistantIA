from rest_framework import serializers
from .models import Gasto, Ingreso, Presupuesto

class GastoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gasto
        exclude = ['user']

    def validate_categoria(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("La categoría no puede estar vacía.")
        return value


class IngresoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingreso
        exclude = ['user']

    def validate_fuente(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("La fuente no puede estar vacía.")
        return value


class PresupuestoSerializer(serializers.ModelSerializer):
    gastos = GastoSerializer(many=True, read_only=True)

    class Meta:
        model = Presupuesto
        exclude = ['user']
        extra_kwargs = {
            'plan': {'required': False, 'allow_null': True, 'read_only': True}
        }

    def validate_metas_ahorro(self, value):
        if value < 0:
            raise serializers.ValidationError("Las metas de ahorro no pueden ser negativas.")
        return value

    def validate(self, data):
        ingresos = data.get('ingresos', 0)
        metas_ahorro = data.get('metas_ahorro', 0)
        if metas_ahorro > ingresos:
            raise serializers.ValidationError("La meta de ahorro no puede ser mayor que los ingresos.")
        return data

