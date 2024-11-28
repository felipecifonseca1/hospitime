from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Hospital
from .serializers import HospitalSerializer

class HospitalList(APIView):
    def get(self, request):
        hospitals = Hospital.objects.all()
        serializer = HospitalSerializer(hospitals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)