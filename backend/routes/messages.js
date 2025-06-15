const express = require('express');
const router = express.Router();
const messagesController = require('../controller/messagesController');

// Routes pour les messages
router.get('/', messagesController.createMessage); // Route pour créer un message
router.get('/:id', messagesController.getMessages); // Route pour récupérer les messages d'un utilisateur

module.exports = router;