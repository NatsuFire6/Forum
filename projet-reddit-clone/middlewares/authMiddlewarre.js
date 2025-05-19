// middlewares/authMiddlewarre.js

function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/login');
}

function ensureAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  res.status(403).send('Accès interdit');
}

module.exports = {
  ensureAuthenticated,
  ensureAdmin
};
