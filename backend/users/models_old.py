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
    class Status(models.TextChoices):
        ONLINE = "online", "Online"
        BUSY = "busy", "Busy"
        OFFLINE = "offline", "Offline"

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="worker_profile")
    zone = models.CharField(max_length=100)          # T.Nagar, Adyar...
    specialization = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.OFFLINE)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    total_jobs = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.get_full_name() or self.user.username}"