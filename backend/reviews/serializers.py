from rest_framework import serializers

from .models import Review
from bookings.models import Booking
from users.models import WorkerProfile


class ReviewSerializer(serializers.ModelSerializer):
    booking_id = serializers.PrimaryKeyRelatedField(
        queryset=Booking.objects.all(),
        source="booking",
        write_only=True
    )

    class Meta:
        model = Review
        fields = [
            "id",
            "booking",
            "booking_id",
            "worker",
            "rating",
            "comment",
            "created_at",
        ]
        read_only_fields = ("id", "booking", "worker", "created_at")

    def validate(self, data):
        booking = data["booking"]

        # ✅ Only completed booking
        if booking.status != "completed":
            raise serializers.ValidationError(
                "You can only review completed bookings"
            )

        # ✅ Only one review per booking
        if hasattr(booking, "review"):
            raise serializers.ValidationError(
                "Review already exists for this booking"
            )

        return data

    def create(self, validated_data):
        booking = validated_data["booking"]

        review = Review.objects.create(
            customer=self.context["request"].user,
            booking=booking,
            worker=booking.worker,
            rating=validated_data["rating"],
            comment=validated_data.get("comment", "")
        )

        # 🔥 Update worker rating
        worker = booking.worker
        if worker:
            reviews = worker.reviews.all()
            avg_rating = sum(r.rating for r in reviews) / reviews.count()
            worker.rating = round(avg_rating, 2)
            worker.total_jobs = reviews.count()
            worker.save()

        return review