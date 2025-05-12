// routes/posts.js
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/reddit-clone.db');

// Tous les posts
router.get('/', (req, res) => {
  db.all(`SELECT posts.*, users.username AS author FROM posts JOIN users ON posts.user_id = users.id ORDER BY created_at DESC`, (err, posts) => {
    if (err) return res.status(500).send("Erreur lors du chargement des posts.");
    res.render('posts/index', { posts });
  });
});

// Création d’un post - form
router.get('/create', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('posts/create');
});

// Création d’un post - enregistrement
router.post('/', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const { title, content } = req.body;
  db.run(`INSERT INTO posts (user_id, title, content, created_at) VALUES (?, ?, ?, datetime('now'))`,
    [req.session.user.id, title, content],
    (err) => {
      if (err) return res.status(500).send("Erreur lors de la création du post.");
      res.redirect('/posts');
    }
  );
});

// Détails d’un post avec commentaires
router.get('/:id', (req, res) => {
  const postId = req.params.id;
  db.get(`SELECT posts.*, users.username AS author FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?`, [postId], (err, post) => {
    if (err || !post) return res.status(404).send("Post introuvable.");
    db.all(`SELECT comments.*, users.username AS author FROM comments JOIN users ON comments.user_id = users.id WHERE comments.post_id = ? ORDER BY created_at ASC`,
      [postId], (err2, comments) => {
        if (err2) return res.status(500).send("Erreur lors du chargement des commentaires.");
        res.render('posts/show', { post, comments });
      });
  });
});

// Ajouter un commentaire
router.post('/:id/comments', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const { content } = req.body;
  const postId = req.params.id;
  db.run(`INSERT INTO comments (user_id, post_id, content, created_at) VALUES (?, ?, ?, datetime('now'))`,
    [req.session.user.id, postId, content],
    (err) => {
      if (err) return res.status(500).send("Erreur lors de l'ajout du commentaire.");
      res.redirect(`/posts/${postId}`);
    });
});

module.exports = router;
