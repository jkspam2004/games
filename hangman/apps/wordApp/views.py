from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse
from .models import WordList
import sys, traceback

""" request db for words """
# words = WordList.words.raw('SELECT * FROM wordapp_wordlist')
def index(request):
    kwargs = {}
    if request.GET.get('difficulty', None):
        kwargs['level'] = request.GET['difficulty']
    if request.GET.get('limit', None):
        kwargs['count'] = request.GET['count']

    words = WordList.words.show_all(**kwargs)
    words = list(map((lambda x: x['word']), words))
    print "got {} words".format(len(words))
    words = "\n".join(words)

    return HttpResponse(words)

""" add a word """
def create(request):
    kwargs = {}
    if 'word' in request.GET and 'level' in request.GET:
        kwargs['word'] = request.GET['word']
        kwargs['level'] = request.GET['level']
        WordList.words.create(**kwargs)
        print "added word {} at level {}".format(kwargs['word'], kwargs['level'])
    return redirect("word:show_url")

""" delete everything in word db """
def delete(request):
    WordList.words.delete_everything()
    return redirect("word:show_url")

""" import all words into the database """
def load(request, batchid):
    print "load", batchid
    WordList.words.load_all_words(int(batchid))
    return HttpResponse("loaded")
