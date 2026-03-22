from django.db import models
from django.conf import settings
from django.utils import timezone
import random

from services.models import Service, VehicleType
from users.models import WorkerProfile


def generate_order_id():
    return f"VLC-{random.randint(1000, 9999)}"


class Vehicle(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="vehicles",
        null=True,
        blank=True
    )
    vehicle_type = models.ForeignKey(VehicleType, on_delete=models.PROTECT)
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=50)
    color = models.CharField(max_length=50, blank=True)
    year = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.registration_number} - {self.make} {self.model}"


class Booking(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        ASSIGNED = "assigned", "Assigned"
        IN_PROGRESS = "in_progress", "In Progress"
        COMPLETED = "completed", "Completed"
        CANCELLED = "cancelled", "Cancelled"

    order_id = models.CharField(
        max_length=20,
        unique=True,
        default=generate_order_id
    )

    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="bookings",
        null=True,
        blank=True
    )

    service = models.ForeignKey(Service, on_delete=models.PROTECT)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.PROTECT)

    scheduled_at = models.DateTimeField(default=timezone.now)

    address = models.TextField()
    zone = models.CharField(max_length=100)

    worker = models.ForeignKey(
        WorkerProfile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="bookings",
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    gst_percent = models.DecimalField(max_digits=5, decimal_places=2, default=18)

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.order_id