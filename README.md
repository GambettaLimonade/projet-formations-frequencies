# projet-formations-frequencies
Ce projet vise à développer une solution de collecte et de centralisation des données sur toutes les formations et ressources existantes pour les associations.


Pour lancer le back : cd backend puis node server.js (Expressjs)
Pour lancer le front : Ouvrir un deuxième terminal, cd frontend puiss npm start (Reactjs)

ce qui a été fait :

SCRAPPING :
- scrapping des formations sur coursera
- scrapping des formations sur la vie associatives

BDD :
- création mise en place d'une base de données postgre
- alimentation de la base par les scripts de scraping de données

BACK :
- mise en place des serveur back Express.js
- lien entre la BDD et le serveur back pour récupérer les données scrappées

FRONT :
- création d'un header et d'un footer (à l'image du site officiel)
- création d'une landing page Frequencies
- création d'une page de Hub de formation qui récupère les données du BACK et les affiche


à faire :

- continuer de scrapper
- administrer la base (doublons, connexion entre les différentes clés etc...)
- UI/UX côté front pour attirer l'utilisateur
- déploiement
- compte utilisateur