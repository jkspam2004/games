from django.shortcuts import render, redirect, HttpResponse
from django.http import HttpResponseRedirect, JsonResponse
from django.core.urlresolvers import reverse
import requests
import random
import re

# index(): display index page
def index(request):
    if 'secret' in request.session:
        return HttpResponseRedirect(reverse('play_url'))

    return render(request, 'index.html')

# start(): endpoint for /start post action 
# set up game, storing session variables
def start(request):
    if request.method == 'POST':
        request.session['name'] = request.POST['name']
        request.session['secret'] = get_word(request.POST['level'])
        request.session['guess_count'] = 6
        request.session['char_dict'] = {}

        request.session['word'] = "_" * len(request.session['secret'])
        request.session['missed'] = {} 

        # turn on the secret word for development
        if request.POST['name'] == 'Bob':
            request.session['debug'] = True

        # store the characters of the word as keys in a dictionary
        # the values are lists of character positions in the word 
        char_dict = {}
        for index, char in enumerate(request.session['secret']):
            if char in char_dict:
                char_dict[char].append(index)
            else:
                char_dict[char] = [index]

        request.session['char_dict'] = char_dict

        return HttpResponseRedirect(reverse('play_url'))
    else:
        return JsonResponse({ "nothing to see": "try again" })


# get_word(level): request words from api
# takes in a difficulty level as input parameter
# returns a random word from list
def get_word(level):
    url = "http://linkedin-reach.hagbpyjegb.us-west-2.elasticbeanstalk.com/words?"
    url += "difficulty=" + level

    response = requests.get(url).content
    wordlist = response.split("\n")
    word = random.choice(wordlist)
    print "secret: " + word
    return word

# play(): displays the game, the form for guessing and guesses so far
def play(request):
    if 'secret' not in request.session:
        return HttpResponseRedirect(reverse('index_url'))

    context = process(request)
    return render(request, 'game/play.html', context) 

# guess(): endpoint for /guess post action
# determine game outcome from guess
# deduct the guess count if character not in the secret word
def guess(request):
    if request.method == 'POST':
        guess = request.POST['guess'].lower()

        # check for valid characters 
        regex = re.escape(guess) 
        if not re.search(r'[a-z]', regex):
            return JsonResponse({ "error": "Special characters and numbers are not valid." }) 

        # check to see if letter already guessed from the missed list and correct guesses
        if guess in request.session['missed'] or re.search(regex, request.session['word']): 
            return JsonResponse({ "error": "You have already guessed that." }) 

        missed = None
        occurrences = None
        # guessing a word
        if len(guess) > 1:
            # correct word guess
            if guess == request.session['secret']:
                request.session['word'] = guess
            else:
                missed = "Your guess '{}' is incorrect." .format(guess)
        # guessing a character
        else: 
            # correct character guess
            if guess in request.session['char_dict']:
                times = "times." if len(request.session['char_dict'][guess]) > 1 else "time."
                occurrences = "Character '{}' appears {} {}" .format(guess, str(len(request.session['char_dict'][guess])), times)
                # reveal occurrence of the correct character guess in the word
                progress_list = list(request.session['word'])
                for position in request.session['char_dict'][guess]:
                    progress_list[position] = guess
                request.session['word'] = ''.join(progress_list)

            else:
                missed = "Character '{}' is not part of the word." .format(guess)

        # add the guess to dictionary of misses and decrement count
        if missed:
            request.session['missed'][guess] = 1
            request.session['guess_count'] -= 1

        context = process(request)
        context['missed'] = missed 
        context['occurrences'] = occurrences
     
        return JsonResponse(context)
    else:
        return JsonResponse({ "nothing to see": "try again" })

# process(): helper function
# takes in request as input
# returns context dictionary to render in the display board
def process(request):
    # determine win
    win = False
    if request.session['word'] == request.session['secret'] and request.session['guess_count'] > 0:
        win = True

    # determine if game is over
    game_over = False
    if win or (not win and request.session['guess_count'] <= 0):
        game_over = True

    context = {
        'length'         : len(request.session['secret']),
        'word'           : ' '.join(request.session['word']),
        'guess_count'    : request.session['guess_count'],
        'missed_guesses' : ' '.join(sorted(request.session['missed'])),
        'win'            : win,
        'game_over'      : game_over,
    }

    # reveal the secret word
    if game_over and not win:
        context['secret'] = request.session['secret']

    return context

# get_count(): return the current guess count
def get_count(request):
    if 'secret' not in request.session:
        return HttpResponseRedirect(reverse('index_url'))

    return JsonResponse({ 'guess_count': request.session['guess_count'] });

# reset(): resets session variables
def reset(request):
    if 'secret' not in request.session:
        return HttpResponseRedirect(reverse('index_url'))

    try:
        for key in ['secret', 'word', 'guess_count', 'missed', 'char_dict']:
            del request.session[key]
    except KeyError, e:
        print "Oops!  No such key", e

    return HttpResponseRedirect(reverse('index_url'))

# logout()
def logout(request):
    if 'secret' not in request.session:
        return HttpResponseRedirect(reverse('index_url'))

    try:
        request.session.clear()
    except Exception, e:
        print "Oops! Exception", e

    return HttpResponseRedirect(reverse('index_url'))

# leaderboard(): show scores and your performance
def leaderboard(request):
    if 'secret' not in request.session:
        return HttpResponseRedirect(reverse('index_url'))

    return render(request, 'dashboard/leaderboard.html')

# settings(): options to choose theme, customize word bank, choose number of guesses
def settings(request):
    if 'secret' not in request.session:
        return HttpResponseRedirect(reverse('index_url'))

    return render(request, 'dashboard/settings.html')
