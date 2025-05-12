// controllers/LikeController.js
const Like = require('../models/Like');

module.exports = {
  likePost: async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.id;
    try {
      await Like.like(userId, postId);
      res.status(200).json({ message: 'Post liked' });
    } catch (err) {
      res.status(500).json({ message: 'Error liking post', error: err });
    }
  },

  unlikePost: async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.id;
    try {
      await Like.unlike(userId, postId);
      res.status(200).json({ message: 'Post unliked' });
    } catch (err) {
      res.status(500).json({ message: 'Error unliking post', error: err });
    }
  }
};
