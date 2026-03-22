from django.contrib import admin

from .models_old import ServiceCategory, Service, VehicleType


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "code",
        "category",
        "base_price",
        "duration_minutes",
        "is_popular",
        "is_seasonal",
    )
    list_filter = ("category", "is_popular", "is_seasonal")
    search_fields = ("name", "code", "category__name")
    list_editable = ("base_price", "duration_minutes", "is_popular", "is_seasonal")
    ordering = ("category", "name")


@admin.register(VehicleType)
class VehicleTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
