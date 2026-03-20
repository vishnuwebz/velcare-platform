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
        "customer__email",
        "worker__user__username",
    )
    date_hierarchy = "created_at"
    ordering = ("-created_at",)
