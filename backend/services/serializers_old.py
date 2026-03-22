from rest_framework import serializers

from .models_old import ServiceCategory, Service, VehicleType


class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ["id", "name", "slug"]
        read_only_fields = ("id",)


class ServiceSerializer(serializers.ModelSerializer):
    category = ServiceCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        source="category",
        queryset=ServiceCategorySerializer.Meta.model.objects.all(),
        write_only=True,
    )

    class Meta:
        model = Service
        fields = [
            "id",
            "name",
            "code",
            "category",
            "category_id",
            "base_price",
            "duration_minutes",
            "is_popular",
            "is_seasonal",
            "description",
        ]
        read_only_fields = ("id", "code")


class VehicleTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleType
        fields = ["id", "name", "slug"]
        read_only_fields = ("id",)
