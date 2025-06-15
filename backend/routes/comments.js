const express = require('express');
const router = express.Router();
const commentsController = require('../controller/commentsController');

// Routes pour les commentaires
router.get('/', commentsController.createCommentary);
router.post('/', commentsController.getCommentary);

module.exports = router;