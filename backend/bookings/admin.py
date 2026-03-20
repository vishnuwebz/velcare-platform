from django.contrib import admin

from .models import Vehicle, Booking


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = (
        "registration_number",
        "owner",
        "vehicle_type",
        "make",
        "model",
        "color",
        "year",
    )
    list_filter = ("vehicle_type", "color", "year")
    search_fields = (
        "registration_number",
        "owner__username",
        "owner__email",
        "make",
        "model",
    )
    ordering = ("registration_number",)


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "order_id",
        "customer",
        "service",
        "vehicle",
        "scheduled_at",
        "zone",
        "worker",
        "status",
        "amount",
    )
    list_filter = ("status", "zone", "service", "worker", "scheduled_at")
    search_fields = (
        "order_id",
        "customer__username",
        "customer__email",
        "vehicle__registration_number",
        "worker__user__username",
    )
    date_hierarchy = "scheduled_at"
    ordering = ("-scheduled_at",)
