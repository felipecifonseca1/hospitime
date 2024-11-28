from django.urls import path
from .views import HospitalList

urlpatterns = [
    path('api/hospitals/', HospitalList.as_view(), name='hospital-list'),
]