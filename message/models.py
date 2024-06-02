from django.db import models
from authentication.models import User

platforms_choices = {
    't': 'telegram',
    'v': 'viber',
    'w': 'whatsapp'
}


class Message(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    platform = models.CharField(max_length=1, choices=platforms_choices.items())
    phone_number = models.IntegerField(blank=False, null=False)
    group = models.TextField(blank=False, null=False)

    def __str__(self):
        return self.id_user.username + " sent " + self.content + " to " + str(self.phone_number) + " at " + str(
            self.date_created) + " with " + platforms_choices[self.platform]
