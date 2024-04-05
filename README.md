# Backend BigJob La plateforme

### Prérequis

Avant de démarrer, assurez-vous d'avoir Node.js installé sur votre machine. Vous pouvez vérifier cela en exécutant `node -v` dans votre terminal, ce qui devrait afficher la version de Node.js. Si vous n'avez pas Node.js, téléchargez-le et installez-le depuis [nodejs.org](https://nodejs.org/).

### Installation

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/votre-username/votre-projet.git
   cd votre-projet
   ```

2. **Installer les dépendances**

   Avec NPM :

   ```bash
   npm install
   ```

   Ou avec Yarn :

   ```bash
   yarn
   ```

3. **Initialiser la base de données SQLite**

   Avec NPM :

   ```bash
   npm run initdb
   ```

   Ou avec Yarn :

   ```bash
   yarn db
   ```

   Ceci créera la base de données SQLite et initialisera les tables nécessaires pour le projet et créera un admin avec comme email: admin@laplateforme.io et le password: root.

4. **Lancer le serveur**

   Avec NPM :

   ```bash
   npm start
   ```

   Ou avec Yarn :

   ```bash
   yarn start
   ```

   Le serveur démarrera et sera accessible à `http://localhost:3000` (ou un autre port si configuré différemment).

## API Routes

### Authentification

- **POST `/api/auth/signup`** : Crée un nouvel utilisateur.
- **POST `/api/auth/login`** : Connecte un utilisateur et retourne un JWT.

### Utilisateurs (accessible par tous les utilisateurs authentifiés)

- **GET `/api/users/profile`** : Récupère les informations du profil de l'utilisateur connecté.
- **POST `/api/users/dates`** : Permet à un utilisateur d'ajouter une date.

### Modérateur (accessible uniquement par les utilisateurs avec le rôle de modérateur)

- **GET `/api/moderator/dates`** : Récupère toutes les dates soumises par les utilisateurs.
- **PUT `/api/moderator/dates/:dateId`** : Met à jour le statut d'une date (acceptée, en attente, refusée).

### Administrateur (accessible uniquement par les utilisateurs avec le rôle d'administrateur)

- **GET `/api/admin/users`** : Récupère une liste de tous les utilisateurs.
- **PUT `/api/admin/users/:userId/role`** : Modifie le rôle d'un utilisateur.
