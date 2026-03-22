from rest_framework import viewsets, permissions, filters

from .models_old import ServiceCategory, Service, VehicleType
from .serializers_old import (
    ServiceCategorySerializer,
    ServiceSerializer,
    VehicleTypeSerializer,
)


class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceCategory.objects.all().order_by("name")
    serializer_class = ServiceCategorySerializer
    permission_classes = [permissions.AllowAny]


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Public catalog for services – used on homepage, booking flow, etc.
    """

    queryset = Service.objects.select_related("category").order_by("name")
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "category__name"]  # ?search=premium
    ordering_fields = ["base_price", "duration_minutes", "name"]
    ordering = ["name"]


class VehicleTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = VehicleType.objects.all().order_by("name")
    serializer_class = VehicleTypeSerializer
    permission_classes = [permissions.AllowAny]
