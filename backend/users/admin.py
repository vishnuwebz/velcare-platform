from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from .models_old import User, WorkerProfile


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    list_display = ("username", "email", "role", "phone", "membership_tier", "is_staff")
    list_filter = ("role", "membership_tier", "is_staff", "is_superuser", "is_active")
    search_fields = ("username", "email", "phone")
    ordering = ("username",)

    fieldsets = DjangoUserAdmin.fieldsets + (
        (
            "Velocare fields",
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
    list_display = ("user", "zone", "status", "rating", "total_jobs")
    list_filter = ("status", "zone")
    search_fields = ("user__username", "user__email", "user__first_name", "user__last_name", "zone")
