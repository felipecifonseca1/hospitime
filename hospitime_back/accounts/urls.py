from django.urls import path
from .views import LoginView, RegisterView, ProfileView, ForgotPasswordView, RegisterHospitalView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('register-hospital/', RegisterHospitalView.as_view(), name='register_hospital'),  # Corrigido o nome da URL
]
