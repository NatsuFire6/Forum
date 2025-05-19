// routes/notifications.js
const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Chemin vers ta connexion SQLite
const { ensureAuthenticated } = require('../middlewares/authMiddlewarre');

// 🔔 Afficher les notifications de l’utilisateur connecté
router.get('/', ensureAuthenticated, (req, res) => {
  const userId = req.session.user.id;
  const query = `
    SELECT n.*, u.username AS from_user
    FROM notifications n
    JOIN users u ON n.from_user_id = u.id
    WHERE n.to_user_id = ?
    ORDER BY n.created_at DESC
  `;
  db.all(query, [userId], (err, notifications) => {
    if (err) return res.status(500).send('Erreur de chargement des notifications.');
    res.render('notifications/index', { notifications });
  });
});

// ✅ Marquer toutes les notifications comme lues
router.post('/mark-all-read', ensureAuthenticated, (req, res) => {
  const userId = req.session.user.id;
  db.run(`UPDATE notifications SET is_read = 1 WHERE to_user_id = ?`, [userId], (err) => {
    if (err) return res.status(500).send('Erreur lors de la mise à jour.');
    res.redirect('/notifications');
  });
});

module.exports = router;
