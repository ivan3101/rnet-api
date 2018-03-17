const Express = require('express');
const Router = Express.Router();
const HandleAsyncExceptions = require('../../handlers/handleAsyncExceptions');
const UserController = require('../../controllers/user.controllers');

Router
    .route('/')
    .post(HandleAsyncExceptions(UserController.login));

module.exports = Router;