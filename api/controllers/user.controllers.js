const Boom = require('boom');
const JwtSign = require('jsonwebtoken').sign;
const Secret = require('../config/secret');
const User = require('../models/user.model');

module.exports.addUser = async (req, res) => {
    const user = new User(req.body);
    user.hashedPassword = await user.encryptPassword(req.body.password);
    await user.save();
    return res
        .status(201)
        .json(user);
};

module.exports.login = async (req, res) => {
    const user = await User.findOne({
        'username': req.body.username,
        'isActive': true
    });
    if (!user) throw Boom.unauthorized('Nombre de usuario o contraseña incorrectos');
    if (await user.checkPassword(req.body.password)) {
        const token = await JwtSign(user.toJSON(), Secret, {'expiresIn': '24h'});
        if (token) {
            return res
                .status(200)
                .json({
                    'user': user,
                    'token': token
                })
        }
    } else {
        throw Boom.unauthorized('Correo o contraseña incorrectos');
    }
};