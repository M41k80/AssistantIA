from rest_framework import serializers
from marketing.models import EmailRequest

class EmailRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailRequest
        exclude = ['user']
        extra_kwargs = {
            'msg': {'required': False, 'allow_null': True}
        }


