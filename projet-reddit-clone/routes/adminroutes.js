const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { ensureAdmin } = require('../middlewares/auth'); // middleware à créer

// 🛡️ Voir tous les posts pour modération
router.get('/posts', ensureAdmin, (req, res) => {
  db.all(`SELECT posts.*, users.username AS author FROM posts JOIN users ON posts.user_id = users.id ORDER BY created_at DESC`, (err, posts) => {
    if (err) return res.status(500).send('Erreur lors du chargement des posts.');
    res.render('admin/posts', { posts });
  });
});

// 🧹 Supprimer un post
router.post('/posts/:id/delete', ensureAdmin, (req, res) => {
  db.run(`DELETE FROM posts WHERE id = ?`, [req.params.id], (err) => {
    if (err) return res.status(500).send('Erreur suppression post.');
    res.redirect('/admin/posts');
  });
});

// ✏️ Modifier un post (formulaire)
router.get('/posts/:id/edit', ensureAdmin, (req, res) => {
  db.get(`SELECT * FROM posts WHERE id = ?`, [req.params.id], (err, post) => {
    if (err || !post) return res.status(404).send('Post introuvable.');
    res.render('admin/edit-post', { post });
  });
});

// ✏️ Modifier un post (soumission)
router.post('/posts/:id/edit', ensureAdmin, (req, res) => {
  const { title, content } = req.body;
  db.run(`UPDATE posts SET title = ?, content = ? WHERE id = ?`, [title, content, req.params.id], (err) => {
    if (err) return res.status(500).send('Erreur modification post.');
    res.redirect('/admin/posts');
  });
});

// 💬 Voir les messages privés pour modération
router.get('/messages', ensureAdmin, (req, res) => {
  db.all(`SELECT messages.*, s.username AS sender, r.username AS receiver FROM messages JOIN users s ON s.id = messages.sender_id JOIN users r ON r.id = messages.receiver_id ORDER BY messages.created_at DESC`, (err, messages) => {
    if (err) return res.status(500).send('Erreur chargement messages.');
    res.render('admin/messages', { messages });
  });
});

// 🗑️ Supprimer un message privé
router.post('/messages/:id/delete', ensureAdmin, (req, res) => {
  db.run(`DELETE FROM messages WHERE id = ?`, [req.params.id], (err) => {
    if (err) return res.status(500).send('Erreur suppression message.');
    res.redirect('/admin/messages');
  });
});

module.exports = router;
