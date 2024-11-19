from django.urls import path
from . import views

urlpatterns = [
    path('save-details/', views.save_user_details, name='save_user_details'),
]