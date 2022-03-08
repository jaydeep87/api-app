const passport = require('passport');
const errService = require('./errorService');

function auth(req, res, next) {
  passport.authenticate('jwt', (err, user) => {
    if (err) { return next(err); }
    if (!user) {
      const errObj = errService.createError(501, 'Invalid/Expired AuthToken, Please Re-login!');
      next(errObj);
    }
    next();
  })(req, res, next);
}
module.exports.auth = auth;
