// models/Follow.js
const db = require('../config/database');

module.exports = {
  follow: (followerId, followingId) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO follows (follower_id, following_id) VALUES (?, ?)`;
      db.run(query, [followerId, followingId], function(err) {
        if (err) reject(err);
        resolve(this.lastID);
      });
    });
  },

  unfollow: (followerId, followingId) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM follows WHERE follower_id = ? AND following_id = ?`;
      db.run(query, [followerId, followingId], function(err) {
        if (err) reject(err);
        resolve();
      });
    });
  },

  getFollowers: (userId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT users.username FROM follows JOIN users ON follows.follower_id = users.id WHERE follows.following_id = ?`;
      db.all(query, [userId], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },

  getFollowing: (userId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT users.username FROM follows JOIN users ON follows.following_id = users.id WHERE follows.follower_id = ?`;
      db.all(query, [userId], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }
};
