from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from rest_framework.serializers import CharField, ModelSerializer


# Serializer para o Perfil de Usuário
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['birth_date', 'health_plan', 'address']

class UserSerializer(ModelSerializer):
    password = CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password']

    def create(self, validated_data, adicional_data):
        # Criar o usuário
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )

        # Criar um perfil vazio ou inicial para o usuário
        Profile.objects.create(
            user=user,
            birth_date=adicional_data['birth_date'],
            health_plan=adicional_data['health_plan'],
            address=adicional_data['address'],
        )

        return user
