// models/Message.js
const db = require('../config/database');

module.exports = {
  create: (senderId, receiverId, content) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)`;
      db.run(query, [senderId, receiverId, content], function(err) {
        if (err) reject(err);
        resolve(this.lastID);
      });
    });
  },

  getByReceiverId: (receiverId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT messages.*, users.username AS sender FROM messages JOIN users ON messages.sender_id = users.id WHERE messages.receiver_id = ? ORDER BY created_at DESC`;
      db.all(query, [receiverId], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }
};
