const db = require('../database/db');


// Récupérer tous les posts
const getAllPosts = (req, res) => {
    const query = `
      SELECT p.*, u.username AS author_username
      FROM posts p
      JOIN users u ON p.author_id = u.id
      ORDER BY p.date_publication DESC
    `;
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Erreur lors de la récupérations des posts'});
        }
        res.json(rows);
    });
}   

// Créer un nouveau post
const createPost = (req, res) => {
    const { titre, contenu, author_id } = req.body;

    if (!titre || !contenu || !author_id) {
        return res.status(400).json({message: 'Tous les champs sont requis'});
    }

    const date = new Date().toISOString();

    const query = 
        'INSERT INTO posts (titre, contenu, date_publication, author_id) VALUES (?, ?, ?, ?)';

    const params = [titre, contenu, date, author_id];

    db.run(query, params, function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Erreur lors de la création du post'});
        };
        res.status(201).json({id: this.lastID, titre, contenu, date_publication: date, author_id});
        });
    };

// Récupérer un post par son ID
const getPostById = (req, res) => {
    const postId = req.params.id;
    const query = `
      SELECT p.*, u.username AS author_username
      FROM posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.id = ?
    `;
    db.get(query, [postId], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Erreur lors de la récupération du post'});
        }
        if (!row) {
            return res.status(404).json({message: 'Post non trouvé'});
        }
        res.json(row);
    });
};

// Mettre à jour un post
  const updatePost = (req, res) => {
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
        };
        if (this.changes === 0) {
            return res.status(404).json({message: 'Post non trouvé'});
        };
        res.json({message: 'Post mis à jour avec succès'});
    });
};

// Supprimer un post
const deletePost = (req, res) => {
    const postId = req.params.id;

    db.run('DELETE FROM posts WHERE id = ?', [postId], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Erreur lors de la suppression du post'});
        };
        if (this.changes === 0) {
            return res.status(404).json({message: 'Post non trouvé'});
        };
        res.json({message: 'Post supprimé avec succès'});
    });
};


// exporter les fonctions pour les routes
module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost
}