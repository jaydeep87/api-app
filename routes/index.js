const routes = require('express').Router();
const indexRoute = require('./indexRoute');
const userRoute = require('./userRoute');
const masterRoute = require('./masterRoute');

routes.use('/', indexRoute);
routes.use('/api/users', userRoute);
routes.use('/api/masters', masterRoute);

module.exports = routes;
