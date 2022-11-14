const routes = require('express').Router();
const indexRoute = require('./indexRoute');
const userRoute = require('./userRoute');
const masterRoute = require('./masterRoute');
const studentRoute = require('./studentRoute');
const teacherRoute = require('./teacherRoute');
const staffRoute = require('./staffRoute');
const xlsxUploadRoute = require('./xlsxUploadRoute');

routes.use('/', indexRoute);
routes.use('/api/users', userRoute);
routes.use('/api/students', studentRoute);
routes.use('/api/teachers', teacherRoute);
routes.use('/api/staffs', staffRoute);
routes.use('/api/masters', masterRoute);
routes.use('/api/upload', xlsxUploadRoute);

module.exports = routes;
