from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny

from .models import ServiceCategory, Service, VehicleType
from .serializers import (
    ServiceCategorySerializer,
    ServiceSerializer,
    VehicleTypeSerializer,
)


# ========================
# CATEGORY API
# ========================
class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceCategory.objects.filter(is_active=True)
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]


# ========================
# SERVICE API
# ========================
class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.filter(is_active=True).select_related("category")
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "category__name"]
    ordering_fields = ["base_price", "duration_minutes"]
    ordering = ["base_price"]


# ========================
# VEHICLE TYPES API
# ========================
class VehicleTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = VehicleType.objects.all()
    serializer_class = VehicleTypeSerializer
    permission_classes = [AllowAny]