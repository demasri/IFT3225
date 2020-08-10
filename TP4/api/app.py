# Auteur : Daniel El-Masri (20096261)
# Date : 9 Aout 2020
# IFT3225 - Travail Pratique 4
# Resources :
#            1 - https://flask.palletsprojects.com/en/1.1.x/quickstart/
#            2 - https://www.youtube.com/watch?v=pY9EwZ02sXU (pour l'utilisation de word2vec)
#            3 - http://textfiles.com/directory.html (pour la recuperation de fichier .txt)
#            4 - https://radimrehurek.com/gensim/models/word2vec.html (documentation de word2vec)
#            5 - https://towardsdatascience.com/natural-language-processing-feature-engineering-using-tf-idf-e8b9d00e7e76
#            6 - https://www.youtube.com/watch?v=KE53PAfVJ5c
#            7 - https://www.youtube.com/watch?v=0gI4dqQNNss

import pandas as pd
import glob
import os
import re
import codecs
import numpy
import sklearn
import jinja2
import json
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import matplotlib.pyplot as plt
from stemming.porter2 import stem
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, jsonify, request, make_response, render_template
from flask_cors import CORS, cross_origin

# =================================================================================================================================
# =================================================================================================================================
#                                       LOGIC IMPLEMENTATION
#            Objectif : Creer des vecteurs de mots de plusieurs documents texte afin de les indexer
#                    et les analyser pour voir les similarite semantique (avec la methode cosinus)
# =================================================================================================================================
# =================================================================================================================================


# ==================================================================
#   Etape 1 : Extraire le texte des documents dans un dictionaire:
# ==================================================================


# Fonction qui prend un string en parametre et qui enleve tout les caracteres non-alphabetique.
def clean(str):
    return re.sub("[^a-zA-Z]", " ", str)


# Fonction qui recupere les documents du corpus et creer une variable contenant le texte interieur
def get_document_texts():

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

    return phrases


# ==========================================================================
#   Etape 2 : Ajout de la requete de recherche avec le texte des documents
# ==========================================================================

def add_query_to_phrases(phrases, query):
    phrases.append(query)

    return phrases


# ======================================================================
#   Etape 3 : Generation de la matrice de terme/document des documents
# ======================================================================
def generate_document_term_matrix(phrases):

    # Initialisation du vectorizer de la libraire SkLearn
    vectorizer = TfidfVectorizer()

    # Effectue la transformation sur les phrases dans la variable Vectors
    vectors = vectorizer.fit_transform(phrases).todense()

    # La variable feature_names est la variable qui store le vocabulaire du model
    feature_names = vectorizer.get_feature_names()

    # Stemminization du vacbulaire
    stemmed_feature_names = [stem(word) for word in feature_names]

    # ...
    denselist = vectors.tolist()

    # Genere la matrice de terme/document des documents
    df = pd.DataFrame(denselist, columns=stemmed_feature_names)

    return vectors

# =====================================================================
#   Etape 4 : Calcul de Similarite entre la Requete et les Documents
# =====================================================================


def calculate_similarity(vectors):

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

    return similar_document_names


# =================================================================================================================================
# =================================================================================================================================
#                                         API CODE
# Objectif : Creer une micro api Flask pour pouvoir gerer la communication entre le FrontEnd web et le BackEnd python
#            et pouvoir genrer les mesures de similarite entre la requete et les documents et la presentation de ceux-ci
# =================================================================================================================================
# =================================================================================================================================

# Initialisation de l'API, avec l'ajout du support CORS
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}},
            supports_credentials=True)
app.config['CORS_ALLOW_HEADERS'] = 'Content-Type'


# Variable qui contient les noms des documents du corpus
documents = sorted(glob.glob("../documents_ift/*.txt"))

# template_dir = '../templates'
# jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(template_dir))


# Endpoint pour que le FrontEnd envoie la query de recherche
@app.route('/api/send_query_request', methods=['GET', 'POST', 'OPTIONS'])
def index():
    if(request.method == 'POST'):
        # Convertie le paquet JSON recu en object python

        tmp = str(request.get_json())

        tmp = tmp.replace("'", "\"")

        query_request = json.loads(tmp)

        query = query_request["requete"]

        print(query)

        # Commence la generation de la matrice terme/document
        phrases = get_document_texts()

        # Ajoute la query de recherche au corpus
        phrases = add_query_to_phrases(phrases, query)

        # Genere la matrice terme/document avec les phrases du corpus
        vectors = generate_document_term_matrix(phrases)

        # Calcul la similarite entre les documents et la requete de recherche et retourne la liste des noms de documents qui ont ete resortie
        relevant_documents = calculate_similarity(vectors)

        print(relevant_documents)

        response = jsonify({"documents": relevant_documents})

        d = json.loads(response.get_data())

        d['documents'] = relevant_documents

        response.set_data(json.dumps(d))

        # Genere la liste de noms dans un JSON pour le renvoyer au FrontEnd
        return response

    else:
        return jsonify({"about": 'Hello, World!'})


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type')
    response.headers.add('Access-Control-Allow-Origin',
                         'http://localhost:8080')

    return response


if __name__ == '__main__':
    app.run(host='127.0.0.1', port='5000', debug=True)
