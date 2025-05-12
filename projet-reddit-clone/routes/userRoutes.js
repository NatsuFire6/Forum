// routes/users.js
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/reddit-clone.db');

// Profil utilisateur
router.get('/:username', (req, res) => {
  const username = req.params.username;
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err || !user) return res.status(404).send("Utilisateur introuvable.");

    const userId = user.id;

    db.all(`SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC`, [userId], (err2, posts) => {
      if (err2) return res.status(500).send("Erreur chargement posts utilisateur.");

      db.all(`SELECT comments.*, posts.title FROM comments JOIN posts ON comments.post_id = posts.id WHERE comments.user_id = ? ORDER BY comments.created_at DESC`, [userId], (err3, comments) => {
        if (err3) return res.status(500).send("Erreur chargement commentaires utilisateur.");

        db.all(`SELECT * FROM likes WHERE user_id = ?`, [userId], (err4, likes) => {
          if (err4) return res.status(500).send("Erreur chargement likes utilisateur.");

          db.all(`SELECT * FROM followers WHERE followed_id = ?`, [userId], (err5, followers) => {
            if (err5) return res.status(500).send("Erreur chargement abonnés.");

            db.all(`SELECT * FROM followers WHERE follower_id = ?`, [userId], (err6, following) => {
              if (err6) return res.status(500).send("Erreur chargement abonnements.");

              res.render('users/profile', {
                user,
                posts,
                comments,
                likes,
                followers,
                following
              });
            });
          });
        });
      });
    });
  });
});

module.exports = router;
