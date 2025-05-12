// controllers/PostController.js
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Like = require('../models/Like');

module.exports = {
  createPost: async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id; // Assuming `user` is attached to the request by a middleware
    try {
      const postId = await Post.create(userId, title, content);
      res.status(201).json({ message: 'Post created', postId });
    } catch (err) {
      res.status(500).json({ message: 'Error creating post', error: err });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.getAll();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching posts', error: err });
    }
  },

  getPost: async (req, res) => {
    const postId = req.params.id;
    try {
      const post = await Post.getById(postId);
      const comments = await Comment.getByPostId(postId);
      const likes = await Like.getLikesByPostId(postId);
      res.status(200).json({ post, comments, likes });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching post', error: err });
    }
  }
};
