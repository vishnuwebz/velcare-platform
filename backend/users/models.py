from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        CUSTOMER = "customer", "Customer"
        WORKER = "worker", "Worker"
        ADMIN = "admin", "Admin"

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.CUSTOMER)
    phone = models.CharField(max_length=20, blank=True)
    region = models.CharField(max_length=100, default="Chennai")
    membership_tier = models.CharField(max_length=50, default="Standard")

    def __str__(self):
        return f"{self.username} ({self.role})"


class WorkerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="worker_profile")
    zone = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100, blank=True)
    rating = models.FloatField(default=0)
    total_jobs = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username