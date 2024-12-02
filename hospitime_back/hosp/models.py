from django.db import models

class Hospital(models.Model):
    # Campos que o hospital terá
    name = models.CharField(max_length=255)  #Nome da Unidade
    rede = models.CharField(max_length=255) #Rede que ela faz parte
    specialty = models.CharField(max_length=255) #Especialidades
    location = models.CharField(max_length=255) #Localização
    average_wait_time = models.IntegerField(default=0) #Tempo de espera médio total
    convenios = models.CharField(max_length=255) #Convenios Atendidos  

    def __str__(self):
        return self.name
class Comentario(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='comentarios')
    usuario = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    comentario = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comentário de {self.usuario.username} para {self.hospital.nome}"   