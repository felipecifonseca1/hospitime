from rest_framework import serializers
from .models import Hospital, TempoEspera
from rest_framework.serializers import CharField, ModelSerializer
from django.contrib.auth.models import User


class TempoEsperaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TempoEspera
        fields = ['hospital', 'tempo_espera', 'usuario', 'data_criacao']

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ['address', 'specialties', 'network', 'convenios', 'user']

class UserSerializer(ModelSerializer):
    password = CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data, adicional_data):
        # Criar o usuário
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )

        # Criar um perfil vazio ou inicial para o usuário
        Hospital.objects.create(
            user=user,
            address=adicional_data['address'],
            specialties=adicional_data['specialties'],
            network=adicional_data['network'],
            convenios=adicional_data['convenios']
        )

        return user

