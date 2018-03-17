const Passport = require('passport');
const AuthValidation = require('../config/passport')(Passport);
const Boom = require('boom');

module.exports.authentication = (req, res, next) => {
    Passport.authenticate('jwt', (err, user, info) => {
        if (err) return next(err);
        if (user) return next();
    }, {session: false})(req, res, next)
};

module.exports.authMiddleware = (err, req, res, next) => {
    if (err.name === 'AuthenticationError') {
        return next(Boom.unauthorized(err.message));
    }
    next(err);
};