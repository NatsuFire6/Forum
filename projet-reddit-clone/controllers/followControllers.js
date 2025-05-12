// controllers/FollowController.js
const Follow = require('../models/Follow');

module.exports = {
  followUser: async (req, res) => {
    const followerId = req.user.id;
    const followingId = req.params.id;
    try {
      await Follow.follow(followerId, followingId);
      res.status(200).json({ message: 'Followed successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error following user', error: err });
    }
  },

  unfollowUser: async (req, res) => {
    const followerId = req.user.id;
    const followingId = req.params.id;
    try {
      await Follow.unfollow(followerId, followingId);
      res.status(200).json({ message: 'Unfollowed successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error unfollowing user', error: err });
    }
  },

  getFollowers: async (req, res) => {
    const userId = req.params.id;
    try {
      const followers = await Follow.getFollowers(userId);
      res.status(200).json(followers);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching followers', error: err });
    }
  },

  getFollowing: async (req, res) => {
    const userId = req.params.id;
    try {
      const following = await Follow.getFollowing(userId);
      res.status(200).json(following);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching following', error: err });
    }
  }
};
