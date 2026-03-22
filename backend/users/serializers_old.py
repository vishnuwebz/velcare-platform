from rest_framework import serializers

from .models_old import User, WorkerProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "role",
            "phone",
            "region",
            "membership_tier",
        ]
        read_only_fields = ("id", "role", "membership_tier")


class WorkerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = WorkerProfile
        fields = [
            "id",
            "user",
            "zone",
            "specialization",
            "status",
            "rating",
            "total_jobs",
        ]
        read_only_fields = ("id", "rating", "total_jobs")
