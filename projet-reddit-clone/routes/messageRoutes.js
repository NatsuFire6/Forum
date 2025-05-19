const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Middleware d'authentification (à créer dans middlewares/auth.js)
const { ensureAuthenticated } = require('../middlewares/authMiddlewarre');

// 📥 Afficher la boîte de réception
router.get('/', ensureAuthenticated, (req, res) => {
  const userId = req.session.user.id;

  const query = `
    SELECT m.*, u.username AS sender
    FROM messages m
    JOIN users u ON m.sender_id = u.id
    WHERE m.receiver_id = ?
    ORDER BY m.created_at DESC
  `;
  db.all(query, [userId], (err, messages) => {
    if (err) return res.status(500).send('Erreur serveur');
    res.render('messages/inbox', { messages });
  });
});

// 📄 Voir une conversation avec un utilisateur
router.get('/conversation/:username', ensureAuthenticated, (req, res) => {
  const { username } = req.params;
  const userId = req.session.user.id;

  db.get('SELECT id FROM users WHERE username = ?', [username], (err, targetUser) => {
    if (err || !targetUser) return res.status(404).send('Utilisateur non trouvé');

    const query = `
      SELECT m.*, us.username AS sender, ur.username AS receiver
      FROM messages m
      JOIN users us ON m.sender_id = us.id
      JOIN users ur ON m.receiver_id = ur.id
      WHERE (sender_id = ? AND receiver_id = ?)
         OR (sender_id = ? AND receiver_id = ?)
      ORDER BY m.created_at ASC
    `;
    db.all(query, [userId, targetUser.id, targetUser.id, userId], (err, messages) => {
      if (err) return res.status(500).send('Erreur serveur');
      res.render('messages/conversation', {
        messages,
        targetUser: username
      });
    });
  });
});

// ✉️ Envoyer un message
router.post('/send', ensureAuthenticated, (req, res) => {
  const senderId = req.session.user.id;
  const { to, content } = req.body;

  // Prevent sending empty or whitespace-only messages
  if (!content || !content.trim()) {
    return res.status(400).send('Le message ne peut pas être vide.');
  }

  db.get('SELECT id FROM users WHERE username = ?', [to], (err, user) => {
    if (err || !user) return res.status(404).send('Destinataire non trouvé');

    const insert = `INSERT INTO messages (sender_id, receiver_id, content, created_at) VALUES (?, ?, ?, datetime('now'))`;
    db.run(insert, [senderId, user.id, content], (err) => {
      if (err) return res.status(500).send('Erreur à l\'envoi');
      res.redirect('/messages/conversation/' + to);
    });
  });
});

module.exports = router;
