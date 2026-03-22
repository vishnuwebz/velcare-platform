from django.urls import path
from .views import simple_booking

urlpatterns = [
    path("simple-booking/", simple_booking),
]