// models/Like.js
const db = require('../config/database');

module.exports = {
  like: (userId, postId) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO likes (user_id, post_id) VALUES (?, ?)`;
      db.run(query, [userId, postId], function(err) {
        if (err) reject(err);
        resolve(this.lastID);
      });
    });
  },

  unlike: (userId, postId) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM likes WHERE user_id = ? AND post_id = ?`;
      db.run(query, [userId, postId], function(err) {
        if (err) reject(err);
        resolve();
      });
    });
  },

  getLikesByPostId: (postId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS like_count FROM likes WHERE post_id = ?`;
      db.get(query, [postId], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  },

  getLikedPostsByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT posts.* FROM likes JOIN posts ON likes.post_id = posts.id WHERE likes.user_id = ?`;
      db.all(query, [userId], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }
};
