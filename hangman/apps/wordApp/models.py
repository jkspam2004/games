from __future__ import unicode_literals

from django.db import models

""" custom manager for wordlist """
class WordManager(models.Manager):
    """ delete all words from database """
    def delete_everything(self):
        WordList.objects.all().delete()

    """ show words with criteria """
    def show_all(self, **kwargs):
        if 'level' in kwargs:
            print "level", kwargs['level']
            words = WordList.objects.filter(level__exact=kwargs['level']).values('word')
        else:
            print "get all"
            words = WordList.objects.all().values('word')
        return words

    """ import words into database """
    def load_all_words(self, batchid):
        print "batchid", batchid
        files = get_files(batchid)
        for entry in files:
            file = entry['file']
            level = entry['level']
            print "============= {}  ==========".format(file)
            with open("files/" + file, 'r') as fd:
                for word in fd:
                    word = word.strip().lower()
                    #WordList.words.create(word=word, level=level)
                    print word

""" WordList model """
class WordList(models.Model):
    word = models.CharField(max_length=10)
    level = models.CharField(max_length=3)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    objects = models.Manager() # default manager
    words = WordManager() # word specific manager

    def __str__(self):
        return self.word + " " + self.level

""" 
get_files(): get filenames and associated level 
input: batchid
return: files list
"""
def get_files(batchid):
    print "in get_files", batchid
    files = []
    if batchid == 1:
        files = [
            { 'file' : 'kinder',
              'level' : 'ck'
            },
            { 'file' : 'first',
              'level' : 'c1'
            },
            { 'file' : 'second',
              'level' : 'c2'
            },
            { 'file' : 'third',
              'level' : 'c3'
            },
            { 'file' : 'fourth',
              'level' : 'c4'
            },
            { 'file' : 'fifth',
              'level' : 'c5'
            },
            { 'file' : 'sixth',
              'level' : 'c6'
            },
            { 'file' : 'seventh',
              'level' : 'c7'
            },
            { 'file' : 'eighth',
              'level' : 'c8'
            },
            { 'file' : 'SAT',
              'level' : 'sat'
            },
        ]
    elif batchid == 2:
        files = [
            { 'file' : 'level1',
              'level' : '1'
            },
            { 'file' : 'level3',
              'level' : '3'
            },
            { 'file' : 'level5',
              'level' : '5'
            },
            { 'file' : 'level7',
              'level' : '7'
            },
            { 'file' : 'level9',
              'level' : '9'
            },
            { 'file' : 'level10',
              'level' : '10'
            },
        ]
    return files


