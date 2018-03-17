const Express = require('express');
const Router = Express.Router();
const AuthRoutes = require('./auth/auth.routes');
const UserRoutes = require('./user/user.routes');
const ArticleRoutes = require('./article/article.routes');

Router
    .use('/auth', AuthRoutes)
    .use('/users', UserRoutes)
    .use('/articles', ArticleRoutes);

module.exports = Router;