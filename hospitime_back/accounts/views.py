from django.shortcuts import render
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.serializers import Serializer, CharField

# Serializador para login
class LoginSerializer(Serializer):
    username = CharField(max_length=100)
    password = CharField(max_length=100)

# View de Login
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(username=serializer.validated_data['username'],
                                 password=serializer.validated_data['password'])
            if user is not None:
                login(request, user)
                return Response({"message": "Login bem-sucedido"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Credenciais inválidas"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
