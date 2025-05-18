from django.urls import path
from marketing.views import ListCreateEmailRequestView, RetrieveUpdateDestroyEmailRequestView

app_name = 'marketing'
urlpatterns = [
    path('emails/', ListCreateEmailRequestView.as_view(), name='email-list-create'),
    path('emails/<int:pk>/', RetrieveUpdateDestroyEmailRequestView.as_view(), name='email-detail'),
]