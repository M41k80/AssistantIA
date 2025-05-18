from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView, ProfileView, LogoutView
from rest_framework_simplejwt.views import TokenRefreshView  # Importar TokenRefreshView

app_name = 'users'
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Añadido para refresco de tokens
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', ProfileView.as_view(), name='profile'),
]