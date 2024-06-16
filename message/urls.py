from django.urls import path
from . import views

urlpatterns = [
   path('getmessages/', views.MessageView.as_view()),
   path('getmessagegroup/', views.MessageGroupView.as_view())
]
