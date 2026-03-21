from rest_framework import viewsets, permissions, filters
from rest_framework.exceptions import PermissionDenied

from .models import Vehicle, Booking
from .serializers import VehicleSerializer, BookingSerializer


class IsAdminOrOwner(permissions.BasePermission):
    """
    - Admin (is_staff) can see everything.
    - Normal users only see their own objects.
    """

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user.is_authenticated:
            return False
        if user.is_staff:
            return True

        # Vehicle.owner or Booking.customer
        owner = getattr(obj, "owner", None) or getattr(obj, "customer", None)
        return owner == user


class VehicleViewSet(viewsets.ModelViewSet):
    """
    Customer's vehicles (My Vehicles) + admin overview.
    """

    serializer_class = VehicleSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrOwner]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["registration_number", "make", "model"]
    ordering_fields = ["year", "make", "model"]
    ordering = ["-year"]

    def get_queryset(self):
        user = self.request.user
        qs = Vehicle.objects.select_related("owner", "vehicle_type")
        if user.is_staff:
            return qs
        return qs.filter(owner=user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class BookingViewSet(viewsets.ModelViewSet):
    """
    - Customers: see & manage their own bookings (dashboard, history).
    - Admin: all bookings with filters (admin dashboard).
    """

    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrOwner]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["order_id", "customer__username", "vehicle__registration_number"]
    ordering_fields = ["scheduled_at", "created_at", "amount"]
    ordering = ["-scheduled_at"]

    def get_queryset(self):
        user = self.request.user
        qs = (
            Booking.objects.select_related(
                "customer",
                "service",
                "vehicle",
                "worker__user",
            )
            .all()
        )
        if user.is_staff:
            return qs
        return qs.filter(customer=user)

    def perform_create(self, serializer):
        # In admin, you could allow explicit customer; for now, bind to request.user
        user = self.request.user
        if not user.is_authenticated:
            raise PermissionDenied("Authentication required.")
        serializer.save(customer=user)
