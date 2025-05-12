module.exports = {
    ensureAdmin: (req, res, next) => {
      if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
      } else {
        return res.status(403).send('Accès interdit : administrateur requis.');
      }
    },
  
    ensureModerator: (req, res, next) => {
      if (req.session && req.session.user && ['admin', 'moderator'].includes(req.session.user.role)) {
        return next();
      } else {
        return res.status(403).send('Accès interdit : modérateur requis.');
      }
    }
};