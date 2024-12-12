<h1>Cesarion aka l'application Backend de gestion des élèves de la commune de Saint-Exupéry</h1>

<h1>Technologies</h1>
Next.Js, Typescript, PostgreSQL, Prisma, Vercel.

<h1>Installer les dépendance:</h1>
npm install

<h1>Lancer le serveur:</h1>
npm run dev

<h1>Routes et exemples:</h1>
GET /api/classes
Récupère la liste des classes et de leurs élèves associés

GET /api/classes/[classeid]
Récupère une classe spécifique et sa liste d'élève

POST /api/classes 
{
    "classerang": "CP",
    "classenom": "B",
    "professeurId": 1
}

GET /api/eleves
Récupère la liste des élèves

GET /api/eleves/[elevesid]
Récupère un élève spécifique

PUT /api/eleves/[elevesid]
Change les informations d'un élève spécifique

POST /api/eleves
[{
    "name": "Alice",
    "lastname": "Johnson",
    "datenaissance": "2010-05-15",
    "redoublant": false,
    "classeId": 1
}]
Si besoin, cette route peut créer plusieurs élèves en même temps.

GET /api/utilisateurs
Récupère la liste des professeurs

GET /api/utilisateurs/[userid]
Récupère un professeurs spécifique

POST /api/utilisateurs
{
    "name": "Jean-Marc",
    "lastname": "Lederff",
    "login": "jlderff",
    "password": "azerty",
    "role": "Professeur"
}

POST /api/creation
[{
    "Niveau": "1ère section maternelle",
    "Nom Élève": "Costa",
    "Prénom Élève": "Denise",
    "Date de Naissance": "2020-03-14",
    "Nom Professeur": "Dufour Zoé"
  },
  {
    "Niveau": "1ère section maternelle",
    "Nom Élève": "Turpin",
    "Prénom Élève": "Alexandrie",
    "Date de Naissance": "2021-10-13",
    "Nom Professeur": "Dufour Zoé"
  },
  {
    "Niveau": "1ère section maternelle",
    "Nom Élève": "Lemaire",
    "Prénom Élève": "Adrienne",
    "Date de Naissance": "2021-12-09",
    "Nom Professeur": "Dufour Zoé"
}]

Ici création d'un professeur, d'une classe et de trois élèves (sauf si déjà existants).
Attention - Puisque Vercel n'est que en version gratuite le temps de ses requêtes est très limité donc si le fichier JSON est trop gros la requête sera refusée.

  POST /api/connexion
  {
    "login" : elias
    "password": azerty
  }

POST /api/year
{
    "year" : 2024
}