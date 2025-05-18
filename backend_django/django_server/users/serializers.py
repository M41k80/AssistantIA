from rest_framework import serializers
from .models import CustomUser

from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password', 'nombre', 'habitos']
        extra_kwargs = {
            'password': {'write_only': True},
            'nombre': {'required': True},
            'habitos': {'required': False, 'allow_null': True},
        }
    
    def validate(self, attrs):
        request = self.context.get('request')
        
        if request and request.method == 'POST':
            password = attrs.get('password')
            if password:
                validate_password(password)

        return attrs

    def update(self, instance, validated_data):
        validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = CustomUserSerializer(self.user).data
        return data
