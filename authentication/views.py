from rest_framework.response import Response
from rest_framework.views import APIView


class Test(APIView):
    def get(self, request):
        return Response("Hello World")
