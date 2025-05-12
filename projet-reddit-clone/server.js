// server.js
const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 3000;

// Base de données
const db = new sqlite3.Database('./db/reddit-clone.db', (err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err.message);
    process.exit(1); // Arrêter le serveur si la base de données n'est pas disponible
  }
  console.log('Connexion à la base de données réussie.');
});

// Configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sessions (il est préférable de stocker les sessions dans un store en prod)
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Pour l'environnement de développement
}));

// Middleware utilisateur connecté
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Routes principales
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');
const notifRoutes = require('./routes/notifications');
const modRoutes = require('./routes/moderation');

app.use('/', authRoutes);
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/messages', messageRoutes);
app.use('/notifications', notifRoutes);
app.use('/moderation', modRoutes);

// Page d'accueil
app.get('/', (req, res) => {
  db.all(`SELECT posts.id, posts.title, posts.content, users.username AS author, posts.created_at AS date
          FROM posts JOIN users ON posts.user_id = users.id
          ORDER BY posts.created_at DESC LIMIT 10`, (err, posts) => {
    if (err) {
      console.error('Erreur lors du chargement des posts:', err.message);
      return res.status(500).send("Erreur lors du chargement des posts.");
    }
    res.render('home', { posts });
  });
});

// Gestion des erreurs non interceptées
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Une erreur interne est survenue');
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
