// app.js
const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const path = require('path');
const app = express();
require('./config/database');
require('./config/init_db_reddit');


// 📦 Configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 🧠 Sessions
app.use(session({
  store: new SQLiteStore({ db: 'sessions.sqlite', dir: './data' }),
  secret: 'reddit-clone-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 jour
}));

// 📂 Moteur de templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 👤 Middleware utilisateur global
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// 📚 Routes
app.use('/', require('./routes/home'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/posts', require('./routes/postRoutes'));
app.use('/user', require('./routes/userRoutes'));
app.use('/messages', require('./routes/messageRoutes'));
app.use('/notifications', require('./routes/notificationRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

// 🛠 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page non trouvée' });
});

// 🚀 Lancement
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
