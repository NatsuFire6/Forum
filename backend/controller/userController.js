const db = require('../database/db');
const bcrypt = require('bcrypt');

// Création d'un utilisateur
const createUser = (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) { 
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const saltRounds = 10;

    // Hashage du mot de passe histoire qu'il ne soit pas stocké en clair tu connais mon gaté
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Erreur de hash du mot de passe" });
        }

        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const params = [username, email, hashedPassword];

        db.run(query, params, function(err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
            }
            res.status(201).json({ id: this.lastID, username, email });
        });
    });
};

    // Récupération d'un utilisateur par son ID
    const getOneUser = (req, res) => {
        const userId = req.params.id;
        db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({message: 'Erreur lors de la récupération de l\'utilisateur'});
            }
            if (!row) {
                return res.status(404).json({message: 'Utilisateur non trouvé'});
            }
            res.json(row);
        }
    );
    };

    // récupération de tous les utilisateurs
    const getAllUsers = (req, res) => {
        db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({message: 'Erreur lors de la récupération des utilisateurs'});
            }
            res.json(rows);
        });
    };

    const loginUser = (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe sont requis' });
        }

        db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
            }
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ message: 'Erreur lors de la comparaison des mots de passe' });
                }
                if (!isMatch) {
                    return res.status(401).json({ message: 'Mot de passe incorrect' });
                }
                res.json({ message: 'Connexion réussie', userId: user.id });
            });
        });
    };

    // Export des fonctions
    module.exports = {
        createUser,
        getOneUser,
        getAllUsers,
        loginUser
    };