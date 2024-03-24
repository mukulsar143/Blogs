from django.urls import path
from .views import *

urlpatterns = [
    path('api/', BlogListCreate.as_view(), name='blog-list'),
    path('api/blogs/', BlogsFun.as_view()),
    path('api/blogs/<uuid>/', BlogsFun.as_view()),
    path('api/publishblogs/<uuid>/', PublishBlog.as_view()),
]
