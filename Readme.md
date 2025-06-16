# Reddit Clone 🧡

## 🎯 Objectif

Ce projet a pour but de recréer une version simplifiée de Reddit : un forum où les utilisateurs peuvent s'inscrire, se connecter, créer des posts, les liker et commenter.

Nous avons choisi d’utiliser **Node.js** pour le backend, avec une base de données **SQLite** pour stocker les utilisateurs, posts, likes et commentaires.

---

## 👨‍💻 Membres du projet

- **SYLLA Timothée**
- **EPAUD Valentin**

---

## 🛠 Technologies utilisées

### Backend :
- **Node.js**
- **Express**
- **SQLite3**
- **bcrypt** (pour le hachage des mots de passe)

### Frontend :
- HTML / CSS / JavaScript Vanilla

---

## 📦 Installation et lancement local

### 1. Cloner le projet :

git clone <url-du-repo>
cd reddit-clone

### 2. Installer les dépendances : 

npm install 

📦 Assurez-vous que bcrypt et sqlite3 sont bien installés :

npm install bcrypt sqlite3

### 3. Lancer le serveur :

cd backend/
npm start


### Structure du projet : 

reddit-clone/
│
├── backend/                          → Backend Node.js
│   ├── controller/                   → Logique métier (gestion des utilisateurs, posts, etc.)
│   ├── database/                     → Base SQLite et scripts de création
│   │   ├── db.js
│   │   ├── ma_base.db
│   │   └── tableCreation.js
│   ├── routes/                       → Routes API (users, posts, etc.)
│   └── app.js                        → Point d’entrée du serveur Express
│
├── front/                            → Frontend statique
│   ├── js/                           → Fichiers JavaScript côté client
│   ├── static/                       → Fichiers CSS, images ou autres assets
│   ├── create_post.html              → Page de création de post
│   ├── home.html                     → Page d’accueil avec les posts
│   ├── login.html                    → Page de connexion
│   ├── profile.html                  → Page de profil utilisateur
│   └── register.html                 → Page d’inscription
│
├── node_modules/                     → Dépendances Node.js
├── package.json                      → Fichier de config npm (backend)
├── package-lock.json
├── Readme.md                         → Ce fichier
