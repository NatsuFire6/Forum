const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./ma_base.db', (err) => {
  if (err) {
    console.error('Erreur de connexion à SQLite :', err.message);
  } else {
    console.log('Connexion à SQLite réussie.');
  }
});

module.exports = db;
