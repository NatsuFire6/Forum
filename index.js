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
      age INTEGER
    )
  `);

  // Insère un utilisateur
  const stmt = db.prepare("INSERT INTO utilisateurs (mail, nom, age) VALUES (?, ?, ?)");
  if (stmt.run("caca@prout", "Alice", 30)) {
    console.error("Erreur lors de l'insertion de l'utilisateur : caca@prout");
  }
  //stmt.run("caca@prouet", "Bob", 25);
  //stmt.run('example@mail.com', 'John Doe', 30);
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
