from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name="index_url"),
    url(r'^start$', views.start, name="start_url"),
    url(r'^play$', views.play, name="play_url"),
    url(r'^guess$', views.guess, name="guess_url"),
    url(r'^reset$', views.reset, name="reset_url"),
]

