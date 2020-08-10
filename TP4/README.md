# Introduction :

Auteur : Daniel El-Masri (20096261)  
Date : 9 Aout 2020  
IFT3225 - Travail Pratique 4  
Objectif : Creer un prototype de moteur de recherche avec une liste de document

Pour creer notre prototype de moteur de recherche, j'ai décider d'utilisé pour le FrontEnd du HTML et CSS avec du Javascript DOM (bien evidement) puisque c'est une des technologies vue en cours. J'ai décider d'utilisé le DOM directement au lieu qu'un framework comme react pour rendre mon FrontEnd plus simple et compréhensible (le DOM est d'après moi plus compréhensible que les components React).  
Pour le BackEnd, J'ai décidé d'utiliser le Python pour faire tout ma gestion logique de generation de matrices et calcul de similarité parce que le langage Python est d'apr`s moi plus facile a utiliser lorsqu'on doit travailler avec plusieurs dépendances externes (comme dans mon cas).  
En effet, puisque l'utilisation d'API est permise, j'ai decider de travailler avec la librairie SkLearn afin de faire ma generation de matrices de vecteurs et mes calculs de similarités  
J'ai aussi decider de creer une micro-api Flask en Python (comme suggerer dans la periode de question du 6 Aout) afin de gerer la communication entre mon FrontEnd et mon BackEnd.  
Ci-dessous, le fonctionnement de chaque partie du code, puis a la fin les requierements pour executer le programme.

# I - Generation de la Matrice terme/document :

1. Recupération des Documents du corpus :

2. Extraction du textes des documents :

3. Ajout de la requete avec les textes de documents :

4. Algorithme de Generation de la Matrice :

# II - Calcul de Similarité :

# III - Affichage des Documents Pertinent :

# IV - Communication par API Flask

# V - Execution de l'Application :

# Conclusion :
