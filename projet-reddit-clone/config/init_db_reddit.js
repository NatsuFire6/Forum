const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../data/database.sqlite');
const sqlPath = path.resolve(__dirname, '../data/reddit.sql');

// Vérifier si le fichier SQL existe
if (!fs.existsSync(sqlPath)) {
  console.error(`❌ Le fichier SQL est introuvable : ${sqlPath}`);
  process.exit(1);
}

const sql = fs.readFileSync(sqlPath, 'utf8');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('❌ Erreur lors de la connexion à SQLite :', err.message);
    process.exit(1);
  } else {
    console.log('✅ Connexion à SQLite réussie !');
  }
});

db.exec(sql, (err) => {
  if (err) {
    console.error('❌ Erreur lors de l’exécution du SQL :', err.message);
  } else {
    console.log('✅ Base de données initialisée avec succès.');
  }
});
