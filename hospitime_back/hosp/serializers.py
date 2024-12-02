from rest_framework import serializers
from .models import Hospital, Comentario

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ['id', 'name', 'rede', 'specialty', 'location', 'average_wait_time', 'convenios']

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ['usuario', 'comentario', 'data_criacao']
        read_only_fields = ['usuario', 'data_criacao']