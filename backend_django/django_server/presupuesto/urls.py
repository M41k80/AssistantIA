from django.urls import path
from presupuesto.views import (
    ListCreateGastoView, RetrieveUpdateDestroyGastoView,
    ListCreateIngresoView, RetrieveUpdateDestroyIngresoView,
    ListCreatePresupuestoView, RetrieveUpdateDestroyPresupuestoView
)

app_name = 'presupuesto'
urlpatterns = [
    # Gastos
    path('gastos/', ListCreateGastoView.as_view(), name='gasto-list-create'),
    path('gastos/<int:pk>/', RetrieveUpdateDestroyGastoView.as_view(), name='gasto-detail'),

    # Ingresos
    # path('ingresos/', ListCreateIngresoView.as_view(), name='ingreso-list'),
    # path('ingresos/<int:pk>/', RetrieveUpdateDestroyIngresoView.as_view(), name='ingreso-detail'),

    # Presupuestos
    path('budget/', ListCreatePresupuestoView.as_view(), name='presupuesto-list'),
    path('budget/<int:pk>/', RetrieveUpdateDestroyPresupuestoView.as_view(), name='presupuesto-detail'),
]