from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from django.utils import timezone

from .models import Vehicle, Booking
from .serializers import VehicleSerializer, BookingSerializer

from services.models import Service, VehicleType


# =========================
# VEHICLE VIEWSET
# =========================
class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    permission_classes = [permissions.AllowAny]


# =========================
# ADVANCED BOOKING VIEWSET
# =========================
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by("-created_at")
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]


# =========================
# SIMPLE BOOKING API (FRONTEND USE)
# =========================
@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def simple_booking(request):
    data = request.data

    try:
        # TEMP mapping (later we replace with real selection)
        service = Service.objects.first()
        vehicle_type = VehicleType.objects.first()

        vehicle = Vehicle.objects.create(
            vehicle_type=vehicle_type,
            make="Unknown",
            model=data.get("vehicle", "Car"),
            registration_number=f"TEMP-{timezone.now().timestamp()}",
        )

        booking = Booking.objects.create(
            service=service,
            vehicle=vehicle,
            scheduled_at=timezone.now(),
            address=data.get("address"),
            zone="Chennai",
            amount=data.get("price", 0),
        )

        return Response({
            "message": "Booking successful",
            "order_id": booking.order_id
        })

    except Exception as e:
        return Response({
            "error": str(e)
        }, status=400)