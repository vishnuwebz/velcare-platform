from django.contrib import admin
from .models import ServiceCategory, Service, VehicleType


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "is_active")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "base_price", "is_popular", "is_active")
    list_filter = ("category", "is_popular", "is_active")
    search_fields = ("name", "code")
    list_editable = ("base_price", "is_popular", "is_active")


@admin.register(VehicleType)
class VehicleTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}