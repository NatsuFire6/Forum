const db = require('../database/db.js');

 // Création d'un message
    const createMessage = (req, res) => {
        const { sender_id, receiver_id, content } = req.body;

        if (!sender_id || !receiver_id || !content) {
            return res.status(400).json({message: 'Tous les champs sont requis'});
        }

        const query = 'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)';
        const params = [sender_id, receiver_id, content];

        db.run(query, params, function(err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({message: 'Erreur lors de la création du message'});
            };
            res.status(201).json({id: this.lastID, sender_id, receiver_id, content});
        });
    };

// Récupération des messages d'un utilisateur
const getMessages = (req, res) => {
    const userId = req.params.id;

    db.all('SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ?', [userId, userId], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Erreur lors de la récupération des messages'});
        };
        res.json(rows);
    });
};

// Export des fonctions
module.exports = {
    createMessage,
    getMessages
};