from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name="show_url"),
    url(r'^create$', views.create, name="create_url"),
    url(r'^delete$', views.delete, name="delete_url"),
    url(r'^load/(?P<batchid>\d+)$', views.load, name="load_url"),
]
