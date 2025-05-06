const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('./ma_base.db');


db.serialize(() => {
  db.run(`
    CREATE TABLE utilisateurs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mail TEXT NOT NULL UNIQUE,
      nom TEXT NOT NULL,
      age INTEGER
    )
  `);

  db.run(`
    CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    contenu TEXT NOT NULL,
    date_publication TEXT NOT NULL,
    author-username TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    commentaires INTEGER DEFAULT 0,)
  )`)



})

