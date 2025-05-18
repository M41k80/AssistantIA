from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import CustomUser
from .serializers import CustomUserSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    @swagger_auto_schema(
        operation_description="Registro de un nuevo usuario",
        security=[],
        responses={
            201: openapi.Response(
                description="Usuario registrado correctamente",
                examples={
                    "application/json": {
                        "user": {
                            "id": 1,
                            "email": "ejemplo@correo.com",
                            "username": "usuario123",
                            "habito": "bla bla bla"
                        },
                        "access": "eyJ0eXAiOiJKV1QiLCJhbGci...",
                        "refresh": "eyJ0eXAiOiJKV1QiLCJhbGci..."
                    }
                }
            ),
            400: openapi.Response(
                description="Bad Request",
                examples={
                    "application/json": {
                        "field_1": ["Field 1 errors ...", "..."],
                        "field_2": ["Field 2 errors ...", "..."]
                    }
                }
            )
        }
    )
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        refresh = RefreshToken.for_user(user)

        return Response({
            'user': serializer.data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    @swagger_auto_schema(
        operation_description="Login y obtención de tokens JWT",
        security=[],
        responses={
            200: openapi.Response(
                description="Usuario loggeado correctamente",
                examples={
                    "application/json": {
                        "user": {
                            "id": 1,
                            "email": "ejemplo@correo.com",
                            "username": "usuario123",
                            "habito": "bla bla bla"
                        },
                        "access": "eyJ0eXAiOiJKV1QiLCJhbGci...",
                        "refresh": "eyJ0eXAiOiJKV1QiLCJhbGci..."
                    }
                }
            ),
            400: openapi.Response(
                description="Bad Request",
                examples={
                    "application/json": {
                        "detail": "No active account found with the given credentials"
                    }
                }
            )
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            response = Response({
                'access': serializer.validated_data['access'],
                'refresh': serializer.validated_data['refresh'],
                'user': serializer.validated_data['user']
            })
            return response
        except Exception as e:
            return Response(
                {"detail": "No active account found with the given credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user
    
    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        return Response(
            {"detail": "Método PUT no permitido. Usá PATCH para actualizaciones parciales."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Logout",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['refresh'],
            properties={
                'refresh': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Refresh token para cerrar sesión.',
                    example='{{refresh_token}}'
                )
            }
        ),
        responses={
            200: openapi.Response(
                description="Token Blacklisted",
                examples={
                    "application/json": {
                        "detail": "Sesión cerrada correctamente."
                    }
                }
            ),
            400: openapi.Response(
                description="Invalid Token",
                examples={
                    "application/json": {
                        "error": "Token is invalid"
                    }
                }
            ),
            401: openapi.Response(
                description="Unauthorized",
            )
        }
    )
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Sesión cerrada correctamente."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)