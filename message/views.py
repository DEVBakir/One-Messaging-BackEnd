from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import MessageGroup, Message
from message.serializer import MessageSerializer, MessageGroupSerializer


class MessageView(APIView):
    serializer_class = MessageSerializer

    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            if MessageGroup.objects.filter(id=serializer.data['group']).exists():
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response('The Group provided does not exist', status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        # messages = Message.objects.filter(id_user=request.data['id_user'])
        messages = Message.objects.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)


class MessageGroupView(APIView):
    serializer_class = MessageGroupSerializer

    def post(self, request):
        serializer = MessageGroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        MessageGroup.objects.filter(id=request.data['id']).delete()
        return Response(status=status.HTTP_200_OK)
