const express = require('express');
const app = express();

// Import des routes depuis le dossier 'routes'
const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postRoutes');
const usersRoutes = require('./routes/userRoutes');
const messagesRoutes = require('./routes/messageRoutes');
const notificationsRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');


// Utilisation des routes
app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);
app.use('/users', usersRoutes);
app.use('/messages', messagesRoutes);
app.use('/notifications', notificationsRoutes);
app.use('/admin', adminRoutes);

// Démarrage du serveur (exemple de port)
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
