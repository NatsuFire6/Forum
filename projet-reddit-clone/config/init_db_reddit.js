const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../data/database.db');
const sqlPath = path.resolve(__dirname, '../data/reddit.sql');

const sql = fs.readFileSync(sqlPath, 'utf8');
const db = new sqlite3.Database(dbPath);

db.exec(sql, (err) => {
  if (err) {
    console.error('❌ Erreur lors de l’exécution du SQL :', err.message);
  } else {
    console.log('✅ Base de données initialisée avec succès.');
  }
  db.close();
});
