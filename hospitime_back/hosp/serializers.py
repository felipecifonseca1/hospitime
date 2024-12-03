from rest_framework import serializers
from .models import Hospital, TempoEspera

class TempoEsperaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TempoEspera
        fields = ['id', 'hospital', 'tempo_espera', 'usuario', 'data_criacao']

