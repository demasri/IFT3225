# Auteur : Daniel El-Masri (20096261)
# Date : 9 Aout 2020
# IFT3225 - Travail Pratique 4
# Objectif : Creer des vecteurs de mots de plusieurs documents texte afin de les indexer
#            et les analyser pour voir les similarite semantique (avec la methode cosinus)
# Resources :
#            1 - https://www.youtube.com/watch?v=pY9EwZ02sXU (pour l'utilisation de word2vec)
#            2 - http://textfiles.com/directory.html (pour la recuperation de fichier .txt)
#            3 - https://radimrehurek.com/gensim/models/word2vec.html (documentation de word2vec)

# Importation de dependances
import codecs
import glob
import multiprocessing
import os
import pprint
import re
import nltk
import gensim.models.word2vec as w2v

# Download de fonctions de tokenization et de filtrage de mots d'arret de la librairie nltk
nltk.download('punkt')
nltk.download('stopwords')

# Recuperation des documents dans le folder
documents = sorted(glob.glob("../documents_ift/*.txt"))
print(documents)

# Combinaison de tout le text dans un string --> Il est preferable d'avoir tout le texte des documents dans un seul ensemble
text_collection = u""
for document in documents:
    print("Lecture de " + document + "....")
    # On utilise la librairie codecs pour formatter le texte des documents en format utf-8
    with codecs.open(document, "r", "utf-8") as document_text:
        text_collection += document_text.read()
        print("La collection de mots contient " +
              str(len(text_collection)) + " caracteres....\n")

# Separation de l'ensemble de text en phrase --> Transforme les mots en tokens, et dans notre cas les tokens seront des phrases
tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')

# Les tokens de phrases sont mis dans cette variable
raw_phrases = tokenizer.tokenize(text_collection)

# Conversion des phrase vers une liste de mots en enlevant les caracteres non-necessaire...


def phrases_to_wordlist(tokens):
    clean = re.sub("[^a-zA-Z]", " ", tokens)
    mots = clean.split()
    return mots


# Creation de la liste contenant toute les phrase des fichiers documents
phrases = []
for raw_phrase in raw_phrases:
    if(len(raw_phrase) > 0):
        phrases.append(phrases_to_wordlist(raw_phrase))

nbr_of_tokens = sum([len(phrase) for phrase in phrases])
print("La colletion de texte contient " + str(nbr_of_tokens) + " tokens\n")

print(raw_phrases[0])
print(phrases_to_wordlist(raw_phrases[0]))

# ================================================================================
# Initialisation de word2vec & Generation du model
# ================================================================================

# Dimension des vecteur termes resultants
num_feature = 300

# Nombre minimum d'instance d'un mot
min_word_count = 3

# Nombre de threads pour l'execution en parallel (+ de threads <-> + rapide)
num_threads = multiprocessing.cpu_count()

# ...
context_size = 7

# Permet de limiter la frequence de fois que le model regardera des mots deja vu (puisque si il est deja vu il est deja dans le model...)
down_sampling = 1e-3

# Generation de nombre aleatoire --> pour choisir un mot aleatoire dans une partie de texte.
seed = 1

# Entrainement de notre model
documents2vec = w2v.Word2Vec(
    sg=1,
    seed=seed,
    workers=num_threads,
    size=num_feature,
    min_count=min_word_count,
    window=context_size,
    sample=down_sampling
)

# Generation de la liste de vocabulaire
documents2vec.build_vocab(phrases)

print("Word2Vec vocab list length: " + str(len(documents2vec.wv.vocab)))

# Entrainement du model en suivant la documentation de word2vec (en entete de main.py)
documents2vec.train(phrases, total_examples=1, epochs=1)

# Sauvegarde du model entrainer dans un fichier pour utilisation plus tard
if not os.path.exists("trained"):
    os.makedirs("trained")

documents2vec.save(os.path.join("trained", "documents2vec.w2v"))

print(documents2vec.wv.most_similar("transmission"))
