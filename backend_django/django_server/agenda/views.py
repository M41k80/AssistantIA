import requests
from pprint import pprint
from django.conf import settings
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import status, APIView
from django.utils import timezone
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from agenda.models import Tarea, Evento
from agenda.serializers import TareaSerializer, EventoSerializer

class ListCreateTareaView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TareaSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Tarea.objects.none()
        return Tarea.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RetrieveUpdateDestroyTareaView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TareaSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Tarea.objects.none()
        return Tarea.objects.filter(user=self.request.user)
    
    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        return Response(
            {"detail": "Método PUT no permitido. Usá PATCH para actualizaciones parciales."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

class ListEventoView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EventoSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Evento.objects.none()
        return Evento.objects.select_related('tarea').filter(tarea__user=self.request.user)

class RetrieveUpdateDestroyEventoView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EventoSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Evento.objects.none()
        return Evento.objects.select_related('tarea').filter(tarea__user=self.request.user)
    
    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        return Response(
            {"detail": "Método PUT no permitido. Usá PATCH para actualizaciones parciales."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

class CreateEventoView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EventoSerializer
    http_method_names = ['post']
    
    def post(self, request, *args, **kwargs):
        user = self.request.user
        if user.is_anonymous:
            return Evento.objects.none()
        return Evento.objects.select_related('tarea').filter(tarea__user=self.request.user)
    


class CrearTareaYEventoView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Crear tarea y generar evento",
        request_body=TareaSerializer,
        responses={
            201: openapi.Response("Evento creado", EventoSerializer),
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
        serializer = TareaSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        tarea = serializer.save(user=request.user)

        fecha_limite = tarea.fecha_limite
        eventos = Evento.objects.select_related("tarea").filter(
            tarea__user=request.user,
            inicio__gte=timezone.now(),
            fin__lte=fecha_limite
        )
        eventos_serializados = EventoSerializer(eventos, many=True).data

        tarea_data = TareaSerializer(tarea).data
        tarea_data["habitos"] = request.user.habitos
        tarea_data["fecha_limite"] = tarea.fecha_limite.strftime("%Y-%m-%d")
        payload = {
            "user_id": request.user.id,
            "task": tarea_data,
            "eventos": eventos_serializados,
        }
        try:
            url = f"{settings.API_AI}/tasks/prioritize"
            response = requests.post(url, json=payload, timeout=20)
            response.raise_for_status()
        except requests.RequestException as e:
            tarea.delete()  # roll back si falla
            return Response({"error": "Error al contactar API externa", "detalle": str(e)},
                            status=status.HTTP_502_BAD_GATEWAY)

        evento_data = response.json().get('evento')
        evento_data["tarea"] = tarea.id  

        evento_serializer = EventoSerializer(data=evento_data, context={'request': request})
        if not evento_serializer.is_valid():
            tarea.delete()  # rollback total
            return Response({"error": "Respuesta inválida de API", "detalle": evento_serializer.errors},
                            status=status.HTTP_400_BAD_REQUEST)

        evento = evento_serializer.save()

        return Response(EventoSerializer(evento).data, status=status.HTTP_201_CREATED)

