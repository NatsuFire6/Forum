// models/User.js
const db = require('../config/database');

module.exports = {
  create: (username, email, passwordHash, role) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)`;
      db.run(query, [username, email, passwordHash, role], function(err) {
        if (err) reject(err);
        resolve(this.lastID);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  },

  getByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE email = ?`;
      db.get(query, [email], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }
};
