from rest_framework import serializers

from message import models


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Message
        fields = '__all__'

    def create(self, validated_data):
        return models.Message.objects.create(**validated_data)

    def __str__(self):
        return f'{models.Message.content} to {models.Message.group.title}'


class MessageGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MessageGroup
        fields = '__all__'
