from rest_framework import serializers

from .models import Vehicle, Booking
from services.models import Service, VehicleType
from users.models import WorkerProfile


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = "__all__"
        read_only_fields = ("id", "owner")


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"
        read_only_fields = (
            "id",
            "order_id",
            "status",
            "created_at",
        )