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

    list_filter = (
        "status",
        "zone",
        "service",
        "worker",
        "scheduled_at",
    )

    search_fields = (
        "order_id",
        "customer__username",
        "vehicle__registration_number",
    )

    date_hierarchy = "scheduled_at"
    ordering = ("-scheduled_at",)

    readonly_fields = ("order_id", "created_at")

    fieldsets = (
        ("Booking Info", {
            "fields": ("order_id", "customer", "service", "vehicle")
        }),
        ("Schedule", {
            "fields": ("scheduled_at", "zone", "address")
        }),
        ("Assignment", {
            "fields": ("worker", "status")
        }),
        ("Billing", {
            "fields": ("amount", "gst_percent")
        }),
        ("Metadata", {
            "fields": ("created_at",)
        }),
    )