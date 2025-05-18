import requests
from django.conf import settings
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from presupuesto.models import Gasto, Ingreso, Presupuesto
from presupuesto.serializers import GastoSerializer, IngresoSerializer, PresupuestoSerializer


class ListCreateGastoView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GastoSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Gasto.objects.none()
        return Gasto.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RetrieveUpdateDestroyGastoView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GastoSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Gasto.objects.none()
        return Gasto.objects.filter(user=self.request.user)

    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        return Response(
            {"detail": "Método PUT no permitido. Usá PATCH para actualizaciones parciales."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )


class ListCreateIngresoView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = IngresoSerializer

    def get_queryset(self):
        return Ingreso.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RetrieveUpdateDestroyIngresoView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = IngresoSerializer

    def get_queryset(self):
        return Ingreso.objects.filter(user=self.request.user)

    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        return Response(
            {"detail": "Método PUT no permitido. Usá PATCH para actualizaciones parciales."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )


class ListCreatePresupuestoView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PresupuestoSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Presupuesto.objects.none()
        return Presupuesto.objects.filter(user=user).order_by('-id')

    @swagger_auto_schema(
        operation_summary="Crear plan de presupuesto",
        responses={
            201: openapi.Response(
                description="Plan creado",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "plan": openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                "plan_ahorro": openapi.Schema(
                                    type=openapi.TYPE_OBJECT
                                ),
                                "recomendaciones_reducir_gastos": openapi.Schema(
                                    type=openapi.TYPE_OBJECT
                                ),
                                "sugerencias_distribucion_presupuesto": openapi.Schema(
                                    type=openapi.TYPE_OBJECT
                                ),
                            }
                        )
                    }
                )
            ),
            400: openapi.Response(
                description="Datos inválidos",
                examples={
                    "application/json": {
                        "error": "Respuesta inválida de API", 
                        "detalle": "field_1_errors, field_2_errors, ..."
                    }
                }
            )
        }
    )
    def post(self, request):
        serializer = PresupuestoSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        gastos = Gasto.objects.filter(user=request.user)
        presupuesto = serializer.save(user=request.user)
        presupuesto.gastos.set(gastos)

        payload = PresupuestoSerializer(presupuesto).data
        # payload.pop('plan')
        try:
            url = f"{settings.API_AI}/budget/plan"
            response = requests.post(url, json=payload, timeout=20)
            response.raise_for_status()
        except requests.RequestException as e:
            presupuesto.delete()  # roll back si falla
            return Response({"error": "Error al contactar API externa", "detalle": str(e)},
                            status=status.HTTP_502_BAD_GATEWAY)

        presupuesto.plan = response.json().get("plan_presupuesto", "Sin plan generado.")
        presupuesto.save()

        return Response({"plan": presupuesto.plan}, status=status.HTTP_201_CREATED)


class RetrieveUpdateDestroyPresupuestoView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PresupuestoSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Presupuesto.objects.none()
        return Presupuesto.objects.filter(user=user).order_by('-id')

    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        return Response(
            {"detail": "Método PUT no permitido. Usá PATCH para actualizaciones parciales."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )
