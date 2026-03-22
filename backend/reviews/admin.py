from django.contrib import admin
from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "booking",
        "customer",
        "worker",
        "rating",
        "created_at",
    )

    list_filter = ("rating", "created_at")

    search_fields = (
        "booking__order_id",
        "customer__username",
        "worker__user__username",
    )

    date_hierarchy = "created_at"
    ordering = ("-created_at",)

    readonly_fields = ("created_at",)

    fieldsets = (
        ("Review Info", {
            "fields": ("booking", "customer", "worker")
        }),
        ("Rating", {
            "fields": ("rating", "comment")
        }),
        ("Metadata", {
            "fields": ("created_at",)
        }),
    )