from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Hospital, TempoEspera
from .serializers import TempoEsperaSerializer, HospitalSerializer, UserSerializer
from django.shortcuts import get_object_or_404

class HospitalList(APIView):
    def get(self, request):
        hospitals = Hospital.objects.all()
        hosp_serialized = HospitalSerializer(hospitals, many=True)
        # for hospital, index in hosp_serialized.data:
        #     user = UserSerializer(User.objects.get(id=hospital['user']))
        #     hospital['user'] = user.data
        #     print(hospital['user']['username'])
        #     if not hospital['user']['username'] == request.GET.get('username'):
        #         hosp_serialized.data.remove(hospital)
        resposta = []
        for i in range(0, len(hosp_serialized.data)):
            user = UserSerializer(User.objects.get(id=hosp_serialized.data[i]['user']))
            hosp_serialized.data[i]['user'] = user.data
            username:str = hosp_serialized.data[i]['user']['username']
            username = username.casefold()
            pesquisa:str = request.GET.get('username')
            pesquisa = pesquisa.casefold()
            if username.find(pesquisa) != -1:
                resposta.append(hosp_serialized.data[i])
        print(resposta)
        return Response(resposta[:2], status=status.HTTP_200_OK)
    

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
    
class RegisterHospitalView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            adicional_data = {
                'address': request.data.get('address'),
                'specialties': request.data.get('specialties'),
                'network': request.data.get('network'),
                'convenios': request.data.get('convenios')
            }
            validated_data = serializer.validated_data
            serializer.create(validated_data, adicional_data)
            return Response({"message": "Hospital cadastrado com sucesso!"}, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    