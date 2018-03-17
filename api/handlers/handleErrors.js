module.exports = (err, req, res, next) => {
    if (res.headersSent) return next(err);
    res
        .status(err.output.statusCode)
        .json(err.output);
};