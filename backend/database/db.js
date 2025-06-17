const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Utiliser un chemin absolu vers le fichier de base de données
const dbPath = path.resolve(__dirname, 'ma_base.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erreur de connexion à SQLite :', err.message);
  } else {
    console.log('Connexion à SQLite réussie. Base située à :', dbPath);
  }
});

module.exports = db;
