from django.db import models
from django.contrib.auth.models import User

# Modelo de Perfil de Usuário
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  
    birth_date = models.DateField(null=True, blank=True)  
    health_plan = models.CharField(max_length=255, blank=True, null=True) 
    address = models.TextField(blank=True, null=True) 

    def __str__(self):
        return f"Perfil de {self.user.username}"