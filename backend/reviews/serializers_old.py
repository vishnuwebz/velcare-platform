from rest_framework import serializers

from .models_old import Review
from bookings.serializers import BookingSerializer
from users.serializers import UserSerializer, WorkerProfileSerializer


class ReviewSerializer(serializers.ModelSerializer):
    customer = UserSerializer(read_only=True)
    booking = BookingSerializer(read_only=True)
    worker = WorkerProfileSerializer(read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "customer",
            "booking",
            "worker",
            "rating",
            "comment",
            "created_at",
        ]
        read_only_fields = ("id", "created_at")
