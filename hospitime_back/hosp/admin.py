from django.contrib import admin
from .models import Hospital

# Registro do modelo Hospital no admin
admin.site.register(Hospital)