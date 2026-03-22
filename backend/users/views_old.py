from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers_old import UserSerializer

User = get_user_model()


class MeView(APIView):
    """
    GET /api/me/  -> current authenticated user profile.
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class SignupView(generics.CreateAPIView):
    """
    POST /api/signup/ with:
    {
      "username": "...",
      "email": "...",
      "password": "...",
      "phone": "...",
      "region": "Chennai"
    }
    Creates a customer user (role=customer).
    """

    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        raw_password = data.pop("password", None)

        if not raw_password:
            return Response({"password": ["This field is required."]}, status=400)

        try:
            validate_password(raw_password)
        except ValidationError as e:
            return Response({"password": e.messages}, status=400)

        user = User(
            username=data.get("username"),
            email=data.get("email"),
            phone=data.get("phone", ""),
            region=data.get("region", "Chennai"),
            role=User.Role.CUSTOMER,
        )
        user.set_password(raw_password)
        user.save()

        serializer = self.get_serializer(user)
        return Response(serializer.data, status=201)
