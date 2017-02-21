# Hangman Game

Hangman is a game where the secret-keeper (in this case, the computer) thinks of a word, and the guesser (the user) tries to guess it one letter at a time. The guesser has six guesses. If the guesser guesses a letter which is part of the word, the secret-keeper will reveal all occurrences of that letter in the word. If the guesser guesses a correct letter such that all letters are now revealed, the game is over and player 2 has won. Instead if player 2 runs out of guesses before the whole word is discovered, the game is over and player 1 has won.

## Game Rules

* At the start of the game the computer/secret-keeper will choose a dictionary word
* The guesser loses the game if they guess 6 letters that are not in the secret word
* The guesser wins the game if they guess all letters in the secret word correctly and have not already lost the game per the conditions above

## Prerequisites
Install [Python](https://www.python.org) and [virtualenv](https://virtualenv.pypa.io/en/stable/)

## Installing

Clone the project from github
```
git clone https://github.com/jkspam2004/games.git
```

Change into the hangman base directory
```
cd games/hangman
```

Create virtual environment.  
```
virtualenv -p <python2 executable> venv
```

Bring up the virtual environment
```
source venv/bin/activate
```

Install Python packages
```
pip install -r requirements.txt
```

Run migrations
```
python manage.py makemigrations
python manage.py migrate
```

Run the server
```
python manage.py runserver
```

Play game on your browser
```
Open [hangman](http://localhost:7000) in your browser.
Also deployed [here](http://hangman.emilyatwork.com)
```

## Implementation

As I am currently learning Django, I decided to build this game using that framework.  I have reached controllers and views but not yet models in my learning.  Thus, data is stored in session variables.

A user can select the difficulty level at the beginning of the game.  The user enters a guess in the textbox which can be a letter or word.  A message on the screen will appear indicating the correctness of the guess.  With each wrong guess an apple falls from the tree.  Game is over when there are no more apples on the tree or the user guesses the word.  Session keys are cleared when the user plays again.  jQuery was used so that the page did not have to reload with each guess made.

In the next version I plan to implement a leaderboard as well as a settings menu to customize the theme and other choices.  I will also build my own API for the word list.  There will be a real login/registration using auth.  Messages will be flashed to show errors.

## Extensions

### Implemented
* Add support for guessing full words instead of just letters one at a time
* Add a configurable "difficulty level" and adjust the words that are used based on the user's preference
* Show visual diagram that indicates incorrect guesses (apples falling from tree instead of traditional hangman)

## Built With

* [Python Django](https://www.djangoproject.com/) 
* [Twitter Bootstrap](http://getbootstrap.com/)
* [jQuery](https://jquery.com/)

## Authors
Emily Ramesh

## Credits
1. apple and tree images from google images
2. canvas example from [stackoverflow](http://stackoverflow.com/questions/13129479/random-images-falling-like-rain-in-canvas-javascript)

