const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('./ma_base.db');


db.serialize(() => {
  db.run(`
    CREATE TABLE user (
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
  user_id INTEGER NOT NULL,
  likes INTEGER DEFAULT 0,
  commentaires INTEGER DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES user(id)
  )`)
  .run(`
    CREATE TABLE commentaires (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contenu TEXT NOT NULL,
      date_publication TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      post_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES user(id),
      FOREIGN KEY (post_id) REFERENCES posts(id)
    )
  `);
  db.run(`
    CREATE TABLE likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      post_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES user(id),
      FOREIGN KEY (post_id) REFERENCES posts(id)
    )
  `);
  


})

