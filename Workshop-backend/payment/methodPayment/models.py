from django.db import models

class UserDetail(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    order_id = models.CharField(max_length=255, null=True)
    payment_status = models.BooleanField(default=False)

   
