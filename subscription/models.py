from django.db import models

from authentication.models import User


class Subscription(models.Model):
    type = models.TextField()
    period = models.IntegerField(default=30)


class Subscriptions(models.Model):
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE)
    user = models.ManyToManyField(User)
    date_created = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.subscription.type + " - " + self.user.username + " - " + str(self.is_active)
