const express = require('express');
const router = express.Router();
const { getAllPosts, createPost } = require('../controllers/postsController');

// Route pour récupérer tous les posts
router.get('/', getAllPosts);
// Route pour créer un nouveau post
router.post('/', createPost);
// Route pour récupérer un post par son ID
router.get('/:id', (req, res) => {
    const postId = req.params.id;
    db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Erreur lors de la récupération du post'});
        }
        if (!row) {
            return res.status(404).json({message: 'Post non trouvé'});
        }
        res.json(row);
    });
});
// Route pour mettre à jour un post
router.put('/:id', (req, res) => {
    const postId = req.params.id;
    const { titre, contenu } = req.body;

    if (!titre || !contenu) {
        return res.status(400).json({message: 'Tous les champs sont requis'});
    }

    const query = 'UPDATE posts SET titre = ?, contenu = ? WHERE id = ?';
    const params = [titre, contenu, postId];

    db.run(query, params, function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Erreur lors de la mise à jour du post'});
        }
        if (this.changes === 0) {
            return res.status(404).json({message: 'Post non trouvé'});
        }
        res.json({message: 'Post mis à jour avec succès'});
    });
});
// Route pour supprimer un post
router.delete('/:id', (req, res) => {
    const postId = req.params.id;

    db.run('DELETE FROM posts WHERE id = ?', [postId], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Erreur lors de la suppression du post'});
        }
        if (this.changes === 0) {
            return res.status(404).json({message: 'Post non trouvé'});
        }
        res.json({message: 'Post supprimé avec succès'});
    });
});
// Route pour liker un post
router.post('/:id/like', (req, res) => {
    const postId = req.params.id;
    const userId = req.body.user_id;
    if (!userId) {
        return res.status(400).json({message: 'L\'ID de l\'utilisateur est requis'});
    }
    db.run('INSERT INTO likes (post_id, user_id) VALUES (?, ?)', [postId, userId], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Erreur lors du like du post'});
        }
        res.status(201).json({message: 'Post liké avec succès', likeId: this.lastID});
    });
}
);
// Route pour récupérer les likes d'un post
router.get('/:id/likes', (req, res) => {
    const postId = req.params.id;
    db.all('SELECT * FROM likes WHERE post_id = ?', [postId], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Erreur lors de la récupération des likes'});
        }
        res.json(rows);
    });
});
// Route pour commenter un post
router.post('/:id/comments', (req, res) => {
    const postId = req.params.id;
    const { user_id, content } = req.body;

    if (!user_id || !content) {
        return res.status(400).json({message: 'L\'ID de l\'utilisateur et le contenu du commentaire sont requis'});
    }

    db.run('INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)', [postId, user_id, content], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Erreur lors de la création du commentaire'});
        }
        res.status(201).json({message: 'Commentaire créé avec succès', commentId: this.lastID});
    });
});
// Route pour récupérer les commentaires d'un post
router.get('/:id/comments', (req, res) => {
    const postId = req.params.id;
    db.all('SELECT * FROM comments WHERE post_id = ?', [postId], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Erreur lors de la récupération des commentaires'});
        }
        res.json(rows);
    });
});
const db = require('../database'); // Assurez-vous que le chemin vers votre base de données est correct
const { getAllPosts, createPost } = require('../controllers/postsController');
const express = require('express');



module.exports = router;