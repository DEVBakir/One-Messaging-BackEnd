from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend


class EmailOrUsernameModelBackend(ModelBackend):
    def authenticate(self, request,email=None,password=None, **kwargs):
        UserModel = get_user_model()
        try:
            if '@' in email:
                user = UserModel.objects.get(email=email)
            else:
                user = UserModel.objects.get(username=email)
        except UserModel.DoesNotExist:
            return None

        # Check the password and if the user can authenticate
        if user.check_password(password) and self.user_can_authenticate(user):
            return user
