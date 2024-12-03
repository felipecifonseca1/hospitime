from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.serializers import Serializer, CharField, ModelSerializer
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from .models import Profile
from rest_framework.permissions import IsAuthenticated
from .models import Hospital
from .serializers import HospitalSerializer

from django.core.mail import send_mail, EmailMessage
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.forms import PasswordResetForm

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
                
                # Gerar o token JWT
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                
                return Response({"message": "Login bem-sucedido", "token": access_token}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Credenciais inválidas"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Serializador para o cadastro de usuário
class UserSerializer(ModelSerializer):
    password = CharField(write_only=True)
    confirm_password = CharField(write_only=True)  # Campo de confirmação de senha

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'confirm_password']

    def validate(self, data):
        # Validando se as senhas coincidem
        if data['password'] != data['confirm_password']:
            raise ValidationError("As senhas não coincidem.")
        return data

    def create(self, validated_data):
        # Remover a confirmação de senha para não tentar salvar no banco
        validated_data.pop('confirm_password')

        # Criar o usuário
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )

        # Criar um perfil vazio ou inicial para o usuário
        Profile.objects.create(user=user)

        return user


# View de Cadastro de Usuário
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Usuário cadastrado com sucesso!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ['birth_date', 'health_plan', 'address']


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]  # Apenas usuários autenticados podem acessar

    def get(self, request):
        try:
            # Obtém o usuário autenticado
            user = request.user
            profile = user.profile

            # Serializa os dados do usuário e do perfil
            user_serializer = UserSerializer(user)
            profile_serializer = ProfileSerializer(profile)

            # Combina os dados do perfil e do usuário
            data = {**user_serializer.data, **profile_serializer.data}
            return Response(data)

        except Profile.DoesNotExist:
            return Response({'detail': 'Perfil não encontrado'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        try:
            user = request.user
            profile = user.profile

            # Atualiza os dados do perfil
            profile_serializer = ProfileSerializer(profile, data=request.data, partial=True)
            if profile_serializer.is_valid():
                profile_serializer.save()

            # Atualiza os dados do usuário
            user_serializer = UserSerializer(user, data=request.data, partial=True)
            if user_serializer.is_valid():
                user_serializer.save()

            return Response(user_serializer.data)  # Retorna os dados atualizados do usuário
        except Profile.DoesNotExist:
            return Response({'detail': 'Perfil não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')

        if not email:
            return Response({'detail': 'E-mail não fornecido.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'detail': 'Usuário com este e-mail não encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
        # Gerar o link de redefinição de senha
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(user.pk.encode('utf-8')).decode()

        reset_url = f'http://localhost:3000/reset-password/{uid}/{token}/'

        # Enviar e-mail com o link
        send_mail(
            'Redefinição de Senha',
            f'Clique no link para redefinir sua senha: {reset_url}',
            '',
            [email],
            fail_silently=False,
        )

        return Response({'detail': 'Link para redefinição de senha enviado para seu e-mail.'}, status=status.HTTP_200_OK)

class RegisterHospitalView(APIView):
    def post(self, request):
        serializer = HospitalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Salva os dados no banco
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)