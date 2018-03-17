const Secret = require('./secret');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Secret;

module.exports = function(Passport) {
    Passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        const user = await User.findOne({
            '_id': jwt_payload._id,
            'isActive': true
        });
        if (user) return done(null, user);
        else return done({
            'name': 'AuthenticationError',
            'message': 'Debe iniciar sesión para usar esta funcion'
        }, false);
    }));
};
