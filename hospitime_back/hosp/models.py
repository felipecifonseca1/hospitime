from django.db import models

class Hospital(models.Model):
    # Campos que o hospital terá
    name = models.CharField(max_length=255)  
    specialty = models.CharField(max_length=255) 
    location = models.CharField(max_length=255)  
    average_wait_time = models.IntegerField(default=0)  

    def __str__(self):
        return self.name
    
