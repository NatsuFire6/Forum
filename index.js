const sqlite3 = require('sqlite3').verbose();

// Ouvre ou crée une base de données
const db = new sqlite3.Database('./ma_base.db');

// Crée une table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS utilisateurs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mail TEXT NOT NULL UNIQUE,
      nom TEXT NOT NULL,
      password TEXT NOT NULL,
    )
  `);

  // Insère un utilisateur
  const stmt = db.prepare("INSERT INTO utilisateurs (mail, nom, password) VALUES (?, ?, ?)");
  stmt.run("caca@prouet", "Bob");
  stmt.run('example@mail.com', 'John Doe');
  stmt.finalize();

  // Affiche tous les utilisateurs
  db.each("SELECT id, mail, nom, age FROM utilisateurs", (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`${row.id}: ${row.mail} ${row.nom} (${row.age} ans)`);
    }
  });
});

// Ferme la base de données
db.close();
