const db = require('../database/db');

// Création d'un commentaire
    const createCommentary = (req, res) => {
        const { post_id, users_id, content } = req.body;

        if (!post_id || !users_id || !content) {
            return res.status(400).json({message: 'Tous les champs sont requis'});
        }

        const query = 'INSERT INTO comments (post_id, users_id, content) VALUES (?, ?, ?)';
        const params = [post_id, users_id, content];

        db.run(query, params, function(err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({message: 'Erreur lors de la création du commentaire'});
            };
            res.status(201).json({id: this.lastID, post_id, users_id, content});
        });
    };

    // Récupération des commentaires d'un post
    const getCommentary = (req, res) => {
        const postId = req.params.id;

        db.all('SELECT * FROM comments WHERE post_id = ?', [postId], (err, rows) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({message: 'Erreur lors de la récupération des commentaires'});
            };
            res.json(rows);
        });
    };

    // Export des fonctions
    module.exports = {
        createCommentary,
        getCommentary
    };