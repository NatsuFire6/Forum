const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// du coup pareil mais la c'est les routes pour les users
router.get('/', userController.getAllUsers);
router.get('/username', userController.getUserByUsername);
router.get('/id/:id', userController.getUserById);
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;
