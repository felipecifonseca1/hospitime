from rest_framework.views import APIView
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Hospital, Comentario
from .serializers import HospitalSerializer
from .serializers import ComentarioSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets

class HospitalList(APIView):
    def get(self, request):
        hospitals = Hospital.objects.all()
        serializer = HospitalSerializer(hospitals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

@api_view(['GET'])
def search_hospitals(request):
    name = request.GET.get('name', '')
    bairro = request.GET.get('bairro', '')
    especialidade = request.GET.get('especialidade', '')

    hospitals = Hospital.objects.all()

    if name:
        hospitals = hospitals.filter(name__icontains=name)
    if bairro:
        hospitals = hospitals.filter(bairro__icontains=bairro)
    if especialidade:
        hospitals = hospitals.filter(especialidade__icontains=especialidade)

    serializer = HospitalSerializer(hospitals, many=True)
    return Response(serializer.data)

class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer

    def perform_create(self, serializer):
        # Assume que o usuário está autenticado
        user = self.request.user
        hospital_id = self.kwargs['hospital_id']
        hospital = Hospital.objects.get(id=hospital_id)
        serializer.save(usuario=user, hospital=hospital)

    def get_queryset(self):
        hospital_id = self.kwargs['hospital_id']
        return Comentario.objects.filter(hospital_id=hospital_id)

    # Permitir apenas usuários autenticados para criar comentários
    permission_classes = [IsAuthenticated]