from django.urls import path
from .views import *

urlpatterns = [
path('api/', BlogsFun.as_view()),
path('api/publishblogs/<uuid>/', PublishBlog.as_view()),
path('api/publish/<id>/', publish, name = 'publish'),
path('api/BlogsCrudApi/', BlogsCrudApi.as_view()),
path('api/email/', send_email, name = 'publish'),
path('api/BlogsCrudApi/<uuid>/', BlogsCrudApi.as_view()),
]
