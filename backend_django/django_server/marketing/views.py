import requests
from django.conf import settings
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from marketing.models import EmailRequest
from marketing.serializers import EmailRequestSerializer


class ListCreateEmailRequestView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EmailRequestSerializer

    def get_queryset(self):
        user = self.request.user
        print(user)
        if user.is_anonymous:
            return EmailRequest.objects.none()
        return EmailRequest.objects.filter(user=self.request.user)

    @swagger_auto_schema(
        operation_summary="Crear email de marketing",
        responses={
            201: openapi.Response(
                description="Email creado",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "email": openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                "subjet": openapi.Schema(type=openapi.TYPE_STRING),
                                "body":  openapi.Schema(type=openapi.TYPE_STRING),
                                "cta":  openapi.Schema(type=openapi.TYPE_STRING),
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
        serializer = EmailRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.save(user=request.user)
        payload = EmailRequestSerializer(email).data

        try:
            url = f"{settings.API_AI}/emails/generate-email"
            response = requests.post(url, json=payload, timeout=20)
            response.raise_for_status()
        except requests.RequestException as e:
            email.delete()  # roll back si falla
            return Response({"error": "Error al contactar API externa", "detalle": str(e)},
                            status=status.HTTP_502_BAD_GATEWAY)
        
        email.email = response.json()
        email.save()

        return Response({"email": email.email}, status=status.HTTP_201_CREATED)



class RetrieveUpdateDestroyEmailRequestView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EmailRequestSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return EmailRequest.objects.none()
        return EmailRequest.objects.filter(user=self.request.user)

    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        return Response(
            {"detail": "Método PUT no permitido. Usá PATCH para actualizaciones parciales."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )
