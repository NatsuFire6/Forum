// models/Comment.js
const db = require('../config/database');

module.exports = {
  create: (postId, userId, content) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)`;
      db.run(query, [postId, userId, content], function(err) {
        if (err) reject(err);
        resolve(this.lastID);
      });
    });
  },

  getByPostId: (postId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT comments.*, users.username AS author FROM comments JOIN users ON comments.user_id = users.id WHERE comments.post_id = ? ORDER BY created_at ASC`;
      db.all(query, [postId], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }
};
