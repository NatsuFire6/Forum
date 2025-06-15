const db = require('../database/db');

// Liker un post
const likePost = (req, res) => {
    const { post_id, users_id } = req.body;

    if (!post_id || !users_id) {
        return res.status(400).json({message: 'Tous les champs sont requis'});
    }

    const query = 'INSERT INTO likes (post_id, users_id) VALUES (?, ?)';
    const params = [post_id, users_id];

    db.run(query, params, function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Erreur lors du like du post'});
        };
        res.status(201).json({id: this.lastID, post_id, users_id});
    });
};

// on récupère les noms des utilisateurs qui ont liké un post
const getLikes = (req, res) => {
    const postId = req.params.id;

    db.all('SELECT u.usersname FROM likes l JOIN userss u ON l.users_id = u.id WHERE l.post_id = ?', [postId], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Erreur lors de la récupération des likes'});
        };
        res.json(rows);
    });
};

// on récupère le nombre de likes d'un post
const getPostLikesCount = (req, res) => {
    const postId = req.params.id;

    db.get('SELECT COUNT(*) AS likes FROM likes WHERE post_id = ?', [postId], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Erreur lors de la récupération du nombre de likes'});
        };
        res.json(row);
    });
};

// Export des fonctions
module.exports = {
    likePost,
    getLikes,
    getPostLikesCount
};