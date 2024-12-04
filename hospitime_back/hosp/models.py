from django.db import models
from django.contrib.auth.models import User

class Hospital(models.Model):
    # Campos que o hospital terá
    user = models.OneToOneField(User, on_delete=models.CASCADE) 
    network = models.CharField(max_length=255, null=True)
    specialties = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    average_wait_time = models.IntegerField(default=0)  # Tempo de espera inicial
    convenios = models.CharField(max_length=255, null=True, blank=True)

    def calcular_media_tempos_espera(self):
        """
        Calcula a média dos tempos de espera armazenados.
        """
        tempos = self.tempoespera_set.all()  # Relacionamento com o modelo TempoEspera
        if tempos:
            soma = sum(tempo.tempo_espera for tempo in tempos)
            return soma // len(tempos)
        return self.average_wait_time  # Retorna o tempo de espera inicial se não houver entradas

    def __str__(self):
        return self.user.username

class TempoEspera(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    tempo_espera = models.IntegerField()  # O tempo de espera que foi registrado
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)  # Associando ao usuário
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Tempo de espera de {self.usuario.username} para {self.hospital.name}"