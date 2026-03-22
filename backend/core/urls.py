from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from services.views import (
    ServiceCategoryViewSet,
    ServiceViewSet,
    VehicleTypeViewSet,
)
from bookings.views import VehicleViewSet, BookingViewSet
from users.views import SignupView, LoginView, MeView
from reviews.views import ReviewViewSet


# =========================
# ROUTER (MAIN APIs)
# =========================
router = DefaultRouter()
router.register(r"service-categories", ServiceCategoryViewSet, basename="service-category")
router.register(r"services", ServiceViewSet, basename="service")
router.register(r"vehicle-types", VehicleTypeViewSet, basename="vehicle-type")
router.register(r"vehicles", VehicleViewSet, basename="vehicle")
router.register(r"bookings", BookingViewSet, basename="booking")
router.register(r"reviews", ReviewViewSet, basename="review")


# =========================
# URL PATTERNS
# =========================
urlpatterns = [
    # Admin
    path("admin/", admin.site.urls),

    # 🔥 Main API routes (ViewSets)
    path("api/", include(router.urls)),

    # 🔥 Custom APIs (NO CONFLICT NOW)
    path("api/", include("bookings.urls")),   # → /api/simple-booking/

    # Auth APIs
    path("api/signup/", SignupView.as_view(), name="signup"),
    path("api/login/", LoginView.as_view(), name="login"),
    path("api/me/", MeView.as_view(), name="me"),

    # DRF Login (optional)
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]