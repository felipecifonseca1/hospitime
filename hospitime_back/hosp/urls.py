from django.urls import path
from .views import HospitalList
from . import views

urlpatterns = [
    path('api/hospitals', views.search_hospitals, name='search_hospitals'),
    path('api/hospitals/', HospitalList.as_view(), name='hospital-list'),
    
]