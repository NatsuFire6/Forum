const db = require('../database/db.js');
const bcrypt = require('bcrypt');

// Création d'un utilisateur
const createUser = (req, res) => {
    const { username, mail, password } = req.body;

    if (!username || !mail || !password) { 
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const saltRounds = 10;

    // Hashage du mot de passe histoire qu'il ne soit pas stocké en clair tu connais mon gaté
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Erreur de hash du mot de passe" });
        }

        const query = 'INSERT INTO users (username, mail, password) VALUES (?, ?, ?)';
        const params = [username, mail, hashedPassword];

        db.run(query, params, function(err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
            }
            res.status(201).json({ id: this.lastID, username, mail });
        });
    });
};

    // Récupération d'un utilisateur par son ID
    const getUserByUsername = (req, res) => {
    const username = req.params.username;
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
        }
        if (!row) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(row);
    });
};

    // Récupération des données d'un utilisateur par son ID
    const getUserById = (req, res) => {
    const userId = req.params.id;
    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
        }
        if (!row) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(row);
    });
};

    // récupération de tous les utilisateurs
    const getAllUsers = (req, res) => {
        db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({message: err});
            }
            res.json(rows);
        });
    };

    const loginUser = (req, res) => {
  const { mail, password } = req.body;

  if (!mail || !password) {
    return res.status(400).json({ message: 'mail et mot de passe sont requis' });
  }

  db.get('SELECT * FROM users WHERE mail = ?', [mail], (err, user) => {
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

      res.json({ id: user.id, username: user.username, mail: user.mail });
    });
  });
};


    // Export des fonctions
    module.exports = {
        createUser,
        getUserByUsername,
        getUserById,
        getAllUsers,
        loginUser
    };