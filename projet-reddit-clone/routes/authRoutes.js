// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/reddit-clone.db');

// Inscription
router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`, [username, email, hashed], function(err) {
    if (err) return res.status(500).send("Erreur lors de l'inscription.");
    req.session.user = { id: this.lastID, username };
    res.redirect('/');
  });
});

// Connexion
router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err || !user) return res.status(401).send("Identifiants invalides.");
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send("Mot de passe incorrect.");
    req.session.user = { id: user.id, username: user.username };
    res.redirect('/');
  });
});

// Déconnexion
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
