from django.urls import path
from .views import HospitalList, HospitalDetail, AdicionarTempoEspera, RegisterHospitalView

urlpatterns = [
    path('', HospitalList.as_view(), name='hospital-list'),
    path('<int:id>/', HospitalDetail.as_view(), name='hospital-detail'),
    path('<int:id>/adicionar-tempo-espera/', AdicionarTempoEspera.as_view(), name='adicionar-tempo-espera'),  
    path('register/', RegisterHospitalView.as_view(), name='register_hospital'),  # Corrigido o nome da URL
]

