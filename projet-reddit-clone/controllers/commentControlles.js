// controllers/CommentController.js
const Comment = require('../models/Comment');

module.exports = {
  createComment: async (req, res) => {
    const { postId, content } = req.body;
    const userId = req.user.id;
    try {
      const commentId = await Comment.create(postId, userId, content);
      res.status(201).json({ message: 'Comment created', commentId });
    } catch (err) {
      res.status(500).json({ message: 'Error creating comment', error: err });
    }
  },

  getCommentsByPost: async (req, res) => {
    const postId = req.params.id;
    try {
      const comments = await Comment.getByPostId(postId);
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching comments', error: err });
    }
  }
};
