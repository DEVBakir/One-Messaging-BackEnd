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
    platform = models.CharField(max_length=1, choices=[(key, value) for key, value in platforms_choices.items()])
    phone_number = models.CharField(max_length=15)
    group = models.ForeignKey('MessageGroup', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id_user.username} sent {self.content} to {self.phone_number} at {self.date_created} with {platforms_choices[self.platform]}"


class MessageGroup(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title
