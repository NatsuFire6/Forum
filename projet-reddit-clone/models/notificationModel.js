// models/Notification.js
const db = require('../config/database');

module.exports = {
  create: (userId, content) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO notifications (user_id, content) VALUES (?, ?)`;
      db.run(query, [userId, content], function(err) {
        if (err) reject(err);
        resolve(this.lastID);
      });
    });
  },

  getByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC`;
      db.all(query, [userId], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }
};
