require('./api/config/db_connection'); // Database connection

// Importing dependencies
const BodyParser = require('body-parser');
const Morgan = require('morgan');
const Helmet = require('helmet');
const Cors = require('cors');
const Passport = require('passport');
const Express = require('express');
const App = Express();
const PORT = process.env.PORT || 3000;
const Routes = require('./api/routes');
const AuthenticationError = require('./api/handlers/authenticationHandler').authMiddleware;
const ValidationError = require('./api/handlers/validationError');
const ErrorHandler = require('./api/handlers/handleErrors');

// Middlewares
if (App.get('ENV') === 'development') {
    App.use(Morgan('dev'));
} else {
    App.use(Morgan('short'))
}
App.use(Helmet());
App.use(Cors());
App.use(BodyParser.urlencoded({
    extended: false
}));
App.use(BodyParser.json());
App.use(Passport.initialize());

// Routes
App.use('/api', Routes);

// Error handlers
App.use(AuthenticationError);
App.use(ValidationError);
App.use(ErrorHandler);

App.listen(PORT, () => console.log(`API is running in port: ${PORT}`));