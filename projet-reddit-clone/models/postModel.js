// models/Post.js
const db = require('../config/database');

module.exports = {
  create: (userId, title, content) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)`;
      db.run(query, [userId, title, content], function(err) {
        if (err) reject(err);
        resolve(this.lastID);
      });
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT posts.*, users.username AS author FROM posts JOIN users ON posts.user_id = users.id ORDER BY created_at DESC`;
      db.all(query, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT posts.*, users.username AS author FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }
};
