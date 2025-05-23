// config/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 📁 Connexion à la base de données SQLite
const dbPath = path.resolve(__dirname, '../data/database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erreur de connexion à SQLite :', err.message);
  } else {
    console.log('✅ Connexion à SQLite réussie !!');
  }
});

module.exports = db;
