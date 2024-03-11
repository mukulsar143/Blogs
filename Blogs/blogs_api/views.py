from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .serializers import *
from .models import *
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.paginator import Paginator
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db.models import Q
from rest_framework import generics
from django.core.mail import send_mail
from django.conf import settings


# Create your views here.
@api_view(['GET'])
def publish(request, id):    
    try:
        obj = Blogs.objects.get(uuid=id)
        if request.GET.get('search'):
            search = request.GET.get('search')
            obj = obj.filter(Q(title__icontains=search) | Q(descriptions__icontains=search))
        
        page_num = int(request.GET.get('page', 1))
        paginator = Paginator(obj, 1)
        serializer = BlogsSerializer(paginator.page(page_num), many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'status': 500, 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class PublishBlog(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, request, uuid):
        try:
            obj = Blogs.objects.filter(uuid=uuid)
            if request.GET.get('search'):
                search = request.GET.get('search')
                obj = obj.filter(Q(title__icontains=search) | Q(descriptions__icontains=search))
            
            page_num = int(request.GET.get('page', 1))
            paginator = Paginator(obj, 1)
            serializer = BlogsSerializer(paginator.page(page_num), many=True)
            return Response(serializer.data)
  
        except Exception as e:
            return Response({'status': 500, 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            

class BlogsFun(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        try:
            obj = Blogs.objects.filter(username = request.user)
            if request.GET.get('search'):
                search = request.GET.get('search')
                obj = obj.filter(Q(title__icontains = search) | Q(descriptions__icontains = search))
            serializer = BlogsSerializer(obj, many = True)
            return Response({"data" : serializer.data, "success" : True})
        except Exception as e:
            print(e)
            return Response({'status' : 500, "success" : False, 'message' : 'invalid Page Number', 'data' : {}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def post(self, request):
        try:
            data = request.data
            serializer = BlogsSerializer(data = data)
            if serializer.is_valid():
                serializer.validated_data['username'] = request.user
                serializer.save()
                return Response({'status' : 201, 'message' : 'blog sucessfully created', 'data' : serializer.data}, status = status.HTTP_201_CREATED)
            return Response({'errors' : serializer.errors,'mesage' : "bad request"})
        except Exception as e:
            print(e)
            return Response({'status' : 500,'error' : str(e),  'data' : {},}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
    def patch(self, request):
        try:
            data = request.data
            blog = Blogs.objects.filter(uuid = data.get('uuid'))
            if not blog.exists():
                return Response({'status' : 404, 'message' : 'invalid uuid'}, status=status.HTTP_404_NOT_FOUND)
            if request.user != blog[0].username:
                 return Response({'status' : 400, 'message' : 'You Are not athorized user'}, status=status.HTTP_401_UNAUTHORIZED)
            serializer = BlogsSerializer(blog[0], data = data,  partial = True)
            if serializer.is_valid():
                serializer.save()
                return Response({'status' : 201, 'message' : 'Updated successfully', 'data' : serializer.data}, status=status.HTTP_202_ACCEPTED)        
        except Exception as e:
            print(e)
            return Response({'status' : 500, 'data' : {}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
    
    def delete(self, request):
        try:
            data = request.data
            blog = Blogs.objects.filter(uuid = data.get('uuid'))
            if not blog.exists():
                return Response({'status' : 404, 'message' : 'invalid uuid'}, status=status.HTTP_404_NOT_FOUND)
            if request.user != blog[0].username:
                 return Response({'status' : 400, 'message' : 'You Are not athorized user'}, status=status.HTTP_401_UNAUTHORIZED)

            blog[0].delete()
            return Response({'status' : 201, 'message' : 'deleted successfully'}, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response({'status' : 500, 'data' : {}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    
        
        
class BlogsCrudApi(generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = BlogsSerializer
    queryset = Blogs.objects.order_by('?')
    lookup_field = 'uuid'
    
    
@api_view(['POST'])
def send_email(request):
    data = request.data
    serializer = ContactSerializer(data=data)
    if serializer.is_valid():
        recipient_email = [serializer.validated_data['email']]
        send_mail(
            subject=serializer.validated_data['subject'],
            message=serializer.validated_data['message'],
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=recipient_email,  
            fail_silently=False
        )
        serializer.save()
        return Response({'message': 'Message sent...'})
    
    return Response({"errors": serializer.errors, 'message': "bad request"})

            