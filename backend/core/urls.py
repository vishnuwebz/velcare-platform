from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from services.views import (
    ServiceCategoryViewSet,
    ServiceViewSet,
    VehicleTypeViewSet,
)
from bookings.views import VehicleViewSet, BookingViewSet
from users.views import MeView, SignupView

router = DefaultRouter()
router.register(r"service-categories", ServiceCategoryViewSet, basename="service-category")
router.register(r"services", ServiceViewSet, basename="service")
router.register(r"vehicle-types", VehicleTypeViewSet, basename="vehicle-type")
router.register(r"vehicles", VehicleViewSet, basename="vehicle")
router.register(r"bookings", BookingViewSet, basename="booking")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/me/", MeView.as_view(), name="me"),
    path("api/signup/", SignupView.as_view(), name="signup"),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
