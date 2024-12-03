from django.urls import path
from .views import HospitalList, HospitalDetail, AdicionarTempoEspera

urlpatterns = [
    path('api/hospitals/', HospitalList.as_view(), name='hospital-list'),
    path('api/hospitals/<int:id>/', HospitalDetail.as_view(), name='hospital-detail'),
    path('api/hospitals/<int:id>/adicionar-tempo-espera/', AdicionarTempoEspera.as_view(), name='adicionar-tempo-espera'),  
    # path('register/', RegisterHospitalView.as_view(), name='register_hospital'),
]

