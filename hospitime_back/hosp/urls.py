from django.urls import path, include
from .views import HospitalList
from . import views
from .views import ComentarioViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'hospitais/(?P<hospital_id>\d+)/comentarios', ComentarioViewSet, basename='comentarios')

urlpatterns = [
    path('api/hospitals', views.search_hospitals, name='search_hospitals'),
    path('api/hospitals/', HospitalList.as_view(), name='hospital-list'),
    path('api/', include(router.urls)),
    
]