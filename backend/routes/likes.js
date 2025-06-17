const express = require('express');
const router = express.Router();
const likesController = require('../controller/likesController');

// Routes pour les likes
router.get('/', likesController.likePost); // Route pour liker un post
router.get('/:id', likesController.getLikes); // Route pour récupérer les utilisateurs qui ont liké un post
router.get('/count/:id', likesController.getPostLikesCount); // Route pour récupérer le nombre de likes d'un post

module.exports = router;