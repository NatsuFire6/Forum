const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./ma_base.db');

db.serialize(() => {
  // Création de la table utilisateurs
  db.run(`
    CREATE TABLE IF NOT EXISTS utilisateurs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mail TEXT NOT NULL UNIQUE,
      nom TEXT NOT NULL,
      age INTEGER
    )
  `, (err) => {
    if (err) return console.error('Erreur création table utilisateurs :', err.message);
    console.log('Table "utilisateurs" créée avec succès !');
  });

  // Création de la table posts
  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titre TEXT NOT NULL,
      contenu TEXT NOT NULL,
      date_publication TEXT NOT NULL,
      author_username TEXT NOT NULL,
      likes INTEGER DEFAULT 0,
      commentaires INTEGER DEFAULT 0
    )
  `, (err) => {
    if (err) return console.error('Erreur création table posts :', err.message);
    console.log('Table "posts" créée avec succès !');
  });
});

