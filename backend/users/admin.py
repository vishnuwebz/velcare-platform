from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from .models import User, WorkerProfile


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    list_display = (
        "username",
        "email",
        "role",
        "phone",
        "region",
        "membership_tier",
        "is_staff",
    )

    list_filter = (
        "role",
        "membership_tier",
        "is_staff",
        "is_superuser",
        "is_active",
    )

    search_fields = ("username", "email", "phone")
    ordering = ("username",)

    fieldsets = DjangoUserAdmin.fieldsets + (
        (
            "Velocare Info",
            {
                "fields": (
                    "role",
                    "phone",
                    "region",
                    "membership_tier",
                )
            },
        ),
    )


@admin.register(WorkerProfile)
class WorkerProfileAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "zone",
        "specialization",
        "rating",
        "total_jobs",
    )

    list_filter = ("zone",)

    search_fields = (
        "user__username",
        "user__email",
        "zone",
    )

    ordering = ("-rating",)

    readonly_fields = ("rating", "total_jobs")

    fieldsets = (
        ("Worker Info", {
            "fields": ("user", "zone", "specialization")
        }),
        ("Performance", {
            "fields": ("rating", "total_jobs")
        }),
    )