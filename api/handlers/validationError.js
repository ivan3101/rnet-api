const Boom = require('boom');
module.exports = (err, req, res, next) => {
    if (err.name === "ValidationError") {
        return next(Boom.badData(err.errors[Object.keys(err.errors)[Object.keys(err.errors).length - 1]].message));
    } else {
        next(err);
    }
};