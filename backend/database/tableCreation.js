const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/ma_base.db');
console.log('test.');

db.serialize(() => {
  // Création de la table users
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mail TEXT NOT NULL UNIQUE,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      date_inscription TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `, (err) => {
    if (err) return console.error('Erreur création table users :', err.message);
    console.log('Table "users" créée avec succès !');
  });

  // Création de la table posts
  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author_id INTEGER NOT NULL,
      titre TEXT NOT NULL,
      contenu TEXT NOT NULL,
      date_publication TEXT NOT NULL,
      likes INTEGER DEFAULT 0,
      FOREIGN KEY (author_id) REFERENCES users(id)
    )
  `, (err) => {
    if (err) return console.error('Erreur création table posts :', err.message);
    console.log('Table "posts" créée avec succès !');
  });

  // table des commentaires

  db.run(`
    CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    users_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (users_id) REFERENCES users(id)
  )`
  , (err) => {
    if (err) return console.error('Erreur création table comments :', err.message);
    console.log('Table "comments" créée avec succès !');
  });

  // table des messages

  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
  )`
  , (err) => {
    if (err) return console.error('Erreur création table messages :', err.message);
    console.log('Table "messages" créée avec succès !');
  });
  
  // table des likes
  
  db.run(`
    CREATE TABLE IF NOT EXISTS likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      users_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(id),
      FOREIGN KEY (users_id) REFERENCES users(id)
    )
  `, (err) => {
    if (err) return console.error('Erreur création table likes :', err.message);
    console.log('Table "likes" créée avec succès !');
  });

});

