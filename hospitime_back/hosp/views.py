from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Hospital, TempoEspera
from .serializers import TempoEsperaSerializer, HospitalSerializer
from django.shortcuts import get_object_or_404


class HospitalList(APIView):
    def get(self, request):
        hospitals = Hospital.objects.all()
        serializer = HospitalSerializer(hospitals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class HospitalDetail(APIView):
    def get(self, request, id):
        try:
            hospital = Hospital.objects.get(id=id)
            serializer = HospitalSerializer(hospital)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Hospital.DoesNotExist:
            return Response({"detail": "Hospital não encontrado."}, status=status.HTTP_404_NOT_FOUND)

class AdicionarTempoEspera(APIView):
    def post(self, request, id):
        hospital = get_object_or_404(Hospital, id=id)
        
        # Verifica se o usuário está autenticado
        if not request.user.is_authenticated:
            return Response({"detail": "Autenticação necessária."}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Obtém o tempo de espera enviado
        tempo_espera = request.data.get('tempo_espera')

        if not tempo_espera:
            return Response({"detail": "O tempo de espera é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)

        # Cria um novo registro de tempo de espera
        tempo_espera_obj = TempoEspera.objects.create(
            hospital=hospital,
            tempo_espera=tempo_espera,
            usuario=request.user
        )

        # Atualiza a média do tempo de espera
        hospital.average_wait_time = hospital.calcular_media_tempos_espera()
        hospital.save()

        # Retorna o hospital atualizado com o novo tempo de espera
        hospital_serializer = HospitalSerializer(hospital)
        return Response(hospital_serializer.data, status=status.HTTP_201_CREATED)
    