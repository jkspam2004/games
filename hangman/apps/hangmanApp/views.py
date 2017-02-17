from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
import requests
import random
import re

# index(): display index page
def index(request):
    if 'word' in request.session:
        return HttpResponseRedirect(reverse('play_url'))

    return render(request, 'index.html')

# start(): endpoint for /start post action 
# set up game, storing session variables
def start(request):
    request.session['name'] = request.POST['name']
    request.session['level'] = request.POST['level']
    request.session['word'] = get_word(request.session['level'])
    request.session['char_dict'] = {}
    request.session['progress'] = "_" * len(request.session['word'])
    request.session['guess_count'] = 6
    request.session['win'] = False
    request.session['missed'] = {} 

    char_dict = {}
    for index, char in enumerate(request.session['word']):
        print index, char, type(index), type(char)
        if char in char_dict:
            char_dict[char].append(index)
        else:
            char_dict[char] = [index]

    request.session['char_dict'] = char_dict
    print request.session['char_dict']

    return HttpResponseRedirect(reverse('play_url'))

# get_word(level): request words from api
# takes in a difficulty level as input parameter
# returns a random word from list
def get_word(level):
    url = "http://linkedin-reach.hagbpyjegb.us-west-2.elasticbeanstalk.com/words?"
    url += "difficulty=" + level
    response = requests.get(url).content
    wordlist = response.split("\n")
    word = random.choice(wordlist)
    print word
    return word
    

# play(): displays the game, the form for guessing and guesses so far
def play(request):
    context = {
        'length': len(request.session['word']),
    }

    return render(request, 'game/play.html', context) 

# guess(): endpoint for /guess post action
# determine game outcome from guess
# deduct the guess count if character not in the secret word
def guess(request):
    guess = request.POST['guess'].lower()
    print "my guess:", guess

    regex = re.escape(guess) 
    if guess in request.session['missed'] or re.search(regex, request.session['progress']): 
        print "you've already guessed that"
        return HttpResponseRedirect(reverse('play_url'))

    # guessing a word
    if len(guess) > 1:
        # correct word guess
        if guess == request.session['word']:
            request.session['win'] = True    
            request.session['progress'] = guess
        else:
            request.session['missed'][guess] = 1
            request.session['guess_count'] -= 1
    # guess is a character
    else: 
        # correct character guess
        if guess in request.session['char_dict']:
            print "char_dict", request.session['char_dict']
            progress_list = list(request.session['progress'])
            for position in request.session['char_dict'][guess]:
                progress_list[position] = guess
            request.session['progress'] = ''.join(progress_list)

            if request.session['progress'] == request.session['word']:
                request.session['win'] = True    
        else:
            request.session['missed'][guess] = 1
            request.session['guess_count'] -= 1
      

    return HttpResponseRedirect(reverse('play_url'))

# reset(): resets session variables
def reset(request):
    request.session.clear()
    return HttpResponseRedirect(reverse('index_url'))
