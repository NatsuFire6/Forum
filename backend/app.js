const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());            // → autoriser les requêtes du front 
app.use(express.json());    // pouvoir lire les requêtes en JSON tu connais

// Routes
const postRoutes = require('./routes/post');
app.use('/api/posts', postRoutes); // → toutes requêtes /api/posts sera redirigé vers les routes post

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes); // bref t'a compris et on refait pareil pour tout le reste ↓

const commentsRoutes = require('./routes/comments');
app.use('/api/comments', commentsRoutes);

const likesRoutes = require('./routes/likes');
app.use('/api/likes', likesRoutes);

const messagesRoutes = require('./routes/messages');
app.use('/api/messages', messagesRoutes);


// lancer les pages html 

const path = require('path');
app.use(express.static(path.join(__dirname, '..front'))); 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/login.html')); // envoie la page de connexion au lancement du serveur
});


// démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`serveur lancé sur le port http://localhost:${PORT}`);
});
