const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// du coup pareil mais la c'est les routes pour les users
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.post('/', userController.createUser);

module.exports = router;
