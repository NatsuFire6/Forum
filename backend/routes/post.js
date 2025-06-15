const express = require('express');
const router = express.Router();

const postController = require ('../controller/postController');

// Listes des routes pour les posts mon gaté vu que c'est sur que dans 10 t'a oublié
router.get('/',postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);


module.exports = router;