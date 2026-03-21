from rest_framework import serializers

from .models import Vehicle, Booking
from services.serializers import ServiceSerializer, VehicleTypeSerializer
from users.serializers import UserSerializer, WorkerProfileSerializer


class VehicleSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    vehicle_type = VehicleTypeSerializer(read_only=True)
    vehicle_type_id = serializers.PrimaryKeyRelatedField(
        source="vehicle_type",
        queryset=VehicleTypeSerializer.Meta.model.objects.all(),
        write_only=True,
    )

    class Meta:
        model = Vehicle
        fields = [
            "id",
            "owner",
            "vehicle_type",
            "vehicle_type_id",
            "make",
            "model",
            "registration_number",
            "color",
            "year",
        ]
        read_only_fields = ("id", "owner")


class BookingSerializer(serializers.ModelSerializer):
    customer = UserSerializer(read_only=True)
    service = ServiceSerializer(read_only=True)
    service_id = serializers.PrimaryKeyRelatedField(
        source="service",
        queryset=ServiceSerializer.Meta.model.objects.all(),
        write_only=True,
    )
    vehicle = VehicleSerializer(read_only=True)
    vehicle_id = serializers.PrimaryKeyRelatedField(
        source="vehicle",
        queryset=VehicleSerializer.Meta.model.objects.all(),
        write_only=True,
    )
    worker = WorkerProfileSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = [
            "id",
            "order_id",
            "customer",
            "service",
            "service_id",
            "vehicle",
            "vehicle_id",
            "scheduled_at",
            "address",
            "zone",
            "worker",
            "status",
            "amount",
            "gst_percent",
            "created_at",
        ]
        read_only_fields = ("id", "order_id", "status", "created_at")
        extra_kwargs = {
            "scheduled_at": {"required": True, "allow_null": False},
        }
