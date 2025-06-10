const db = require('../database/db');

// Controller pour gérer les posts

// Récupérer tous les posts
const getAllPosts = (req, res) => {
    db.all('SELECT * FROM posts ORDER BY date_publication DESC', (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Erreur lors de la récupérations des posts'});
        }
        res.json(rows);
    });
};


// Création d'un nouveau post
const createPost = (req, res) => {
    const { titre, contenu, author_username } = req.body;

    if (!titre || !contenu || !author_username) {
        return res.status(400).json({message: 'Tous les champs sont requis'});
    }

    const date = new Date().toISOString();

    const query = 
        'INSERT INTO posts (titre, contenu, date_publication, author_username) VALUES (?, ?, ?, ?)';

    const params = [titre, contenu, date, author_username];

    db.run(query, params, function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Erreur lors de la création du post'});
        }
        res.status(201).json({id: this.lastID, titre, contenu, date_publication: date, author_username});
    });
};
module.exports = {
    getAllPosts,
    createPost
}