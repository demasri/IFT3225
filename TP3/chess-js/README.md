Auteur : Daniel El-Masri (20096261)
IFT3225 - Travail Pratique 3
30 Juillet 2020

# Introduction : 

Voici un fichier README qui explique le fonctionnement de la page web d'échec pour l'exercice 1 du TP3. Ce fichier expliquera les méthode de développement des 3 parties majeures.
J’ai utilisé le framework create-react-app pour créer le squelette et l’architecture de la page Web. J’ai décidé de faire cela en suivant les instructions énumérés dans la page d’introduction de React et la raison que j’ai décidé d’utiliser ce framework est simplement car j’ai vu que c’était la manière la plus simple et efficace. Je n'avais pas prie en compte le déploiement de la page sur le serveur du DIRO lors de cette décision.

Il y a deux ressources importantes que j’ai utilisé pour m’aider dans le développement de ce projet : Premièrement la page tutoriel tic-tac-toe de React qui m’a permis de suivre les meilleures pratiques de développement React pour la conception et l’organisation des composantes. Deuxièmement le 2e lien ci-dessous qui elle m’a aider un peu pour la logique du jeu et de déplacement. Ce type de logique qui a déjà été implémenté plusieurs fois semble plus efficace qu’un algorithme que j’aurais pu écrire moi-même donc je fais confiance à leur meilleur expertise. Les sites Web utilisés sont mentionnés ci-dessous.

1. https://reactjs.org/tutorial/tutorial.html#what-are-we-building
2. https://www.techighness.com/post/develop-two-player-chess-game-with-react-js/

# Partie I : Gestion de création de l'échequier :

En suivant les pratiques démontrer dans l’exercice introduction de tic-tac-toe de React, j'ai décomposé l'échequier en composantes Square (carré) qui ensemble créer la composante finale de Board (tableau). C'est exactement comme cela que indique la page tutoriel de React et je n'ai pas voulu ré-inventé la roue. Chaque carré détient trois  attributs important : Premièrement, le ID qui indique l’index du carré par rapport au tableau. Deuxièmement le nom de la classe de cette case, qui elle indique si ce carre doit être de style foncé ou pas. Troisièmement j’ai décidé de suivre la même méthode que l’exercice d'introduction et d’ajouter l'attribut style qui me permettra de gérer la couleur de fond d’un carré lorsqu’il est sélectionné. J'ai aussi ajouté le support de clique par l'attribut onClick, qui lui appellera les correct fonction pour gérer la logique du jeu lors de la sélection de place sur le tableau. J'ai décider de mettre la logique du jeu dans le component Board (tableau), plus de détail la dessus dans la section de gestion de mouvements.

Pour ce qui est des pièces, j’ai décidé de créer une composante générique nommé Piece (pièce) qui elle contient les variables (la couleur et l'image) et méthodes commune à toutes les pièces du jeu. Pour la couleur des pièces, jai décider d'utiliser les SVG que vous avex ajouter dans l'énoncé pour nous aider. J'ai fais directement le lien vers l'URL de l'images pour ne pas avoir a downloader et prendre plus d'espace sur ma machine. Il y a ensuite une composante pour chacune des pièces comme la Tour, le Chevalier, la Reine, le Roi, le Pion et le Fou. Chacune de ses composantes contient de méthodes : La première méthode isLegalMove(src, dest) qui prend la case source et la case destinataire et qui permet de déterminer si un mouvement de cette pièce est légal selon les règles du jeu. La deuxième méthode getSrcToDestPath(serc, dest) permet de déterminer les index des carrés qui sont sur le chemin entre la position de la pièce source et la pièce destinataire sélectionné. Cette fonction viendras utile dans la gestion des mouvements pour savoir si il y a des pièces sur le chemin et donc qui bloquerait le déplacement jusqu’à la destination désirer.

Finalement, la génération du tableau est fait à partir d’une fonction initialiseBoard qui elle associe les pièces du jeu a leur index respectifs. Les cases vides resteront a null pour le début du jeu.

# Partie II : Gestion des Mouvements des Pièces :

Pour la gestion de mouvement durant la partie, comme mentionné ci-dessus, la logique est mise dans la composante Board (tableau), qui elle est appelée à chaque clic dans carrés. Pour comprendre la gestion de clics, il faut d’abord comprendre comment la composante tableau est créé. 

Cette composante contient plusieurs variables (props) : Premièrement, le tableau qui est un Array de pièces avec les pièce du tableau. Deuxièmement, la valeur de la couleur active, qui indique quelle couleur dois jouer un tour. Il y a aussi le statut qui est un string qui permet de mettre à jour les messages qui seront montrer aux utilisateurs incluant le message d’erreur et les étapes suivantes pour jouer. Finalement il y a une variable nommé pieceInitial qui permet de savoir si la case sélectionné est la case source ou la case destinataire d'un mouvement.

L’algorithme de gestion de clique prends en parametre l'index du carré cliquer. Celui commence par faire une copier du Array tableau pour pouvoir effectuer ses modifications sur cette copie. Cette pratique est conseiller dans le tutoriel de React (tic tac toe) et donc j'ai decider de suivre ce conseil. L'algorithme continue par regarder cette valeur pièceInitial. Si cette valeur est -1, l’algorithme sait que la case sélectionné elle la case source du déplacement et donc procéde à faire ses vérifications pour premièrement : s’assurer que la couleur choisie est bien la couleur du joueur actif (qui doit jouer son tour) et de s’assurer que la case sélectionné contient bel et bien une pièce et non une case vide. Une fois une case valide sélectionné, j'utilise l'attribut style de la composante carré pour changer sa couleur de fond afin de la rendre plus visible à l’utilisateur et puis je demande à l’utilisateur de sélectionner la destination de cette pièce désirez et la valeur pieceInitiale est remplacé par l’index de la case source.

Lorsque l’algorithme reçois un deuxième clique suivant la sélection de la case, la valeur initiale n’aura pas la valeur -1 et donc l’algorithme c’est que la case sélectionnée est la case destinataire du mouvement. L’algorithme commence ses vérifications pour s’assurer que c'est une case vide (vide) ou une case qui contient une pièce de la couleur opposé. Si cette validation est passée, l'algorithme commence ses vérifications pour savoir si : le déplacement voulu est légal, en utilisant la fonction isLegalMove mentionné plus haut de la pièce sélectionné. Il regarde aussi si la case destinataire est occupé par une pièce ennemi ou non, puis elle utilise la fonction getSrcToDestPath Pour déterminer les index des carrés à prendre pour arriver à destination. Une fois toutes ces données sortie, la focntion s'assure que le mouvement est légal et que la pièce sélectionné ne rencontrera pas une pièce sur ce chemin qu’il a bloquerai. Cette algorithme prend en compte le fait que le chevalier peux sauter par-dessus des pièces. Lorsque toutes les validation sont passé et que la case selectionnée respecte toutes les conditions, l’algorithme effectuer le déplacement et remplace le la valeur du tableau par la copie modifiée dans l’algorithme. Une fois le deplacement fait, la valeur de pieceInitiale est remis a -1 pour preparer la selection de la case source du deplacement du joueur opposé. 

Avant de faire le déplacement, le mouvement est évalué pour savoir si celui-ci placeras le roi du joueur actif en échec. Mais plus de détails sur cette algorithme seront ci-dessous.

# Partie III : Gestion des Échecs :

L’algorithme de détection d' échecs ce base beaucoup sur l’algorithme pre-existant de gestion de mouvement de pièce. Celui-ci commence d’abord par évalue pour voir si premièrement le roi est en échec actuellement selon sa position actuelle, et deuxièmement évalue pour savoir si le mouvement voulu par l’utilisateur permettra de vaincre cette échec ou non. Il effectue cela en evaluant les cases qui pose un risque autour du roi du joueur actif par la fonction getThreatningBoard(). Cette fonction utilise des méthodes aidantes qui permet de détecter les pièces importantes aux alentours. 

La fonction principale de détection d'échec passe à travers le tableau et vérifie si le mouvement voulu par l’utiliser est un mouvement légal, et qui ne posera pas de risque pour le roi OU un mouvement qui sauvera le roi ci celui-ci se retrouve deja dans un cas d'échec.

Cette fonction a cependant des petits bogues que je n’ai pas pu régler avant la fin du travail, il y a certains cas extrême ou l’algorithme pense que le roi est en échec mais celui-ci ne l'est pas. Or, ces cas la sont rares et en règle générale l’algorithme fonctionne très bien. 


# Partie IV : Gestion des Appels AJAX :

Pour ce qui est de la gestion des appels AJAX, j’ai malheureusement pour moi manqué de temps pour finaliser cette composante de manière fonctionnel et donc je me suis dit de mettre de l’effort sur l’optimisation de la partie 1 serait plus fructueuse.

La méthodologie de séparation en composantes fonctionne bien et la séparation entre les fichiers HTML, JS et CSS est faite correctement, sauf simplement pour un petit endroit où j’ai introduit la valise style de la composante Square (carré) directement dans le code généré dans l'HTML. J’ai décidé cela car pour une petite fonctionnalités comme celle-ci il semble plus compliqué d’ajouter et d’enlever des classes puis d’avoir le CSS modifier le background que simplement de le faire directement sur l'element en question.

L’application fonctionne aussi très bien visuellement sur les ordinateurs et tablette. Il manque seulement la partie téléphone cellulaire qui manque un peu de finesse.

# Partie V : Conclusion et Remise

Pour le dépôt du travail sur le serveur DIRO, cela s’est avéré plus compliqué que prévu. En effet lorsque j’ai décidé de commencer le travail j’ai décidé d’utiliser le framework create-react-app afin de me faciliter le travail de conception du squelette de l’application. Cependant c’est seulement rendu à l’étape de déploiement sur le serveur DIRO que j’ai réalisé que j’aurais dû plutôt ajouter React à une application HTML pure au lieu de commencer l’écriture directement avec React. 

En effet, maintenant pour exécuter mon application correctement, il faut utiliser la commande "npm start" puis ensuite naviguer à l’adresse http://localhost:3000 pour voir avoir l’expérience complète de l’application. Lorsque j’ai essayé de le déployer sur le serveur, je n’ai pas pu faire rouler le JavaScript correctement afin de pouvoir faire apparaître le jeu. 

J'ai cependant suivi toutes les exemples de ressources que vous avez donné dans le cours en incluant Les balises <script/> contenant le lien vers le Y puis en regardant d’autres ressources en ligne. Cependant sans succès je vous remets la totalité du travail dans ce fichier puis pour l’exécuter il faut simplement faire la commande "npm start" plus naviguer vers localhost:3000