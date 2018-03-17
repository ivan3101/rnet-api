const Mongoose = require('mongoose');
const Boom = require('boom');
const Argon = require('argon2');
const Bluebird = require('bluebird');
const userSchema = new Mongoose.Schema({
    'fullName': {
        type: String,
        required: [true, 'El nombre completo del usuario es requerido']
    },
    'email': {
        type: String,
        required: [true, 'El correo electronico del usuario es requerido']
    },
    'imageUrl': {
        type: String,
        default: 'assets/images/Profile_avatar_placeholder_large.png'
    },
    'username': {
        type: String,
        required: [true, 'El nombre de usuario es requerido']
    },
    'hashedPassword': {
        type: String,
        required: [true, 'La contraseña del usuario es requerida']
    },
    'registerDate': {
        type: Date,
        default: Date.now()
    },
    'isActive': {
        type: Boolean,
        default: true
    }
});

userSchema.methods.encryptPassword = function(password) {
    return Argon.hash(password, {
        type: Argon.argon2id
    });
};

userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.hashedPassword;
    delete obj.__v;
    delete obj.isActive;
    return obj;
};

userSchema.methods.checkPassword = function(password) {
    if (!password) throw Boom.unauthorized('Correo o contraseña incorrectos');
    return Argon.verify(this.hashedPassword, password);
};

userSchema.pre('save', function(next) {
    const email = this.constructor.findOne({
        'email': this.email,
        'isActive': true
    });
    const username = this.constructor.findOne({
        'username': this.username,
        'isActive': true
    });
    Bluebird.all([email, username]).then(values => {
        if (values[0]) return next(Boom.conflict('Ya esta registrado un usuario con ese correo electronico'));
        if (values[1]) return next(Boom.conflict('Ya esta registrado un usuario con ese nombre de usuario'));
        return next();
    });
});

module.exports = Mongoose.model('User', userSchema);