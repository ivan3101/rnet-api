const Boom = require('boom');
module.exports = fn => (req, res, next) => {
    fn(req, res, next).catch((err) => {
        if (!err.isBoom) {
            if (err.name === 'ValidationError') {
                return next(err);
            } else {
                return next(Boom.badImplementation(err));
            }
        }
        next(err);
    });
};