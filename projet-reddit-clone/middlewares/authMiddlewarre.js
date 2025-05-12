// middlewares/authMiddleware.js

module.exports = {
    // Assure que l'utilisateur est connecté
    ensureAuthenticated: (req, res, next) => {
      if (req.session && req.session.user) {
        return next();
      } else {
        return res.redirect('/auth/login');
      }
    },
  
    // Redirige les utilisateurs connectés loin de certaines pages (ex: login, register)
    forwardAuthenticated: (req, res, next) => {
      if (!req.session || !req.session.user) {
        return next();
      } else {
        return res.redirect('/');
      }
    }
  };
  