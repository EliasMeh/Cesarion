<h1>Cesarion aka l'application Backend de gestion des élèves de la commune de Saint-Exupéry</h1>

<h1>Technologies<h1>
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

POST /api/eleves
{
    "name": "Alice",
    "lastname": "Johnson",
    "datenaissance": "2010-05-15",
    "redoublant": false,
    "classeId": 1
}

GET /api/professeurs
Récupère la liste des professeurs

GET /api/professeurs/[profid]
Récupère un professeurs spécifique

POST /api/professeurs
{
    "name": "Jean-Marc",
    "lastname": "Lederff",
    "login": "jlderff",
    "password": "azerty"
}
