from django.db import models


class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)  # Car Care, Deep Clean
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class Service(models.Model):
    name = models.CharField(max_length=150)  # Premium Wash
    code = models.CharField(max_length=50, unique=True)  # e.g., PREMIUM_WASH
    category = models.ForeignKey(ServiceCategory, on_delete=models.PROTECT, related_name="services")
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_minutes = models.PositiveIntegerField()
    is_popular = models.BooleanField(default=False)
    is_seasonal = models.BooleanField(default=False)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class VehicleType(models.Model):
    name = models.CharField(max_length=50)  # Hatchback, Sedan, SUV, Bike, Luxury
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name
