# Auteur : Daniel El-Masri (20096261)
# Date : 9 Aout 2020
# IFT3225 - Travail Pratique 4
# Objectif : Creer des vecteurs de mots de plusieurs documents texte afin de les indexer
#            et les analyser pour voir les similarite semantique (avec la methode cosinus)
# Resources :
#            1 - https://www.youtube.com/watch?v=pY9EwZ02sXU (pour l'utilisation de word2vec)
#            2 - http://textfiles.com/directory.html (pour la recuperation de fichier .txt)
#            3 - https://radimrehurek.com/gensim/models/word2vec.html (documentation de word2vec)
#            4 - https://towardsdatascience.com/natural-language-processing-feature-engineering-using-tf-idf-e8b9d00e7e76
#            5 - https://www.youtube.com/watch?v=KE53PAfVJ5c

import pandas as pd
import glob
import re
import codecs
import numpy
import sklearn
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import matplotlib.pyplot as plt
from stemming.porter2 import stem
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# ==================================================================
#   Etape 1 : Extraire le texte des documents dans un dictionaire:
# ==================================================================

# Recuperation des documents dans le folder
documents = sorted(glob.glob("../documents_ift/*.txt"))
print(documents)


# Fonction qui prend un string en parametre et qui enleve tout les caracteres non-alphabetique.
def clean(str):
    return re.sub("[^a-zA-Z]", " ", str)


# Variable qui contient tout les phrases de tout les documents du corpus (dans le dossier "documents_ift")
phrases = []

# Loop qui passe a travers les documents un par un et qui extrait les phrases afin de populer la variable ci-dessus phrase
for document in documents:
    print("Lecture de " + document + "....")
    # On utilise la librairie codecs pour formatter le texte des documents en format utf-8
    with codecs.open(document, "r", "utf-8") as document_text:
        string_document = ""
        for line in document_text:
            string_document += clean(line)
        phrases.append(string_document)
        string_document = ""


query = "computer science"

phrases.append(query)

print(phrases[-1])

# ======================================================================
#   Etape 2 : Generation de la matrice de terme/document des documents
# ======================================================================

# Initialisation du vectorizer de la libraire SkLearn
vectorizer = TfidfVectorizer()

# Effectue la transformation sur les phrases
vectors = vectorizer.fit_transform(phrases).todense()

# La variable feature_names est la variable qui store le vocabulaire du model
feature_names = vectorizer.get_feature_names()

# Stemminization du vacbulaire
stemmed_feature_names = [stem(word) for word in feature_names]

# ...
denselist = vectors.tolist()

# Genere la matrice de terme/document des documents
df = pd.DataFrame(denselist, columns=stemmed_feature_names)

print(df)

# =====================================================================
#   Etape 3 : Calcul de Similarite entre la Requete et les Documents
# =====================================================================

# Calcul des similarites entre la requete et les documents
similarities = {}
for i in range(len(vectors)):
    if cosine_similarity(vectors[-1], vectors[i]) > 0 and cosine_similarity(vectors[-1], vectors[i]) < 1:
        similarities[i] = cosine_similarity(vectors[-1], vectors[i])

# Mise en ordre des documents relevant par ordre d'importance (premier = plus grand match)
sorted_similarities = {k: v for k, v in sorted(
    similarities.items(), key=lambda item: item[1], reverse=True)}

# Recuperation des noms des documents relevant
similar_document_names = []
for similarity in similarities:
    similar_document_names.append(documents[similarity])

print(sorted_similarities)
print(similar_document_names)
