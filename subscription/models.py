from authentication.models import User
from django.db import models


class Subscription(models.Model):
    type = models.CharField(max_length=255)
    period = models.IntegerField(default=30)  # Assuming period is in days

    def __str__(self):
        return self.type


class Subscriptions(models.Model):
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    date_created = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.subscription.type} - {self.user.username} - {'Active' if self.is_active else 'Inactive'}"
