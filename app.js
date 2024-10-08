global.logger = require('./utils/logger')(`api-${new Date().getDate()}_${(new Date().getMonth() + 1)}.log`);
global.collConfig = require('./config/collection.json');
global.authService = require('./services/authService');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const passport = require('passport');
const dotenv = require('dotenv');
const config = require('./config/database');
require('./services/passport')(passport);
const dbConnection = require('./services/dbConnection');

dotenv.config();
mongoose.Promise = global.Promise;
const apiRoutes = require('./routes');
require('./models');

dbConnection(config.database, status => logger.info(status));

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs'); // Create the directory if it does not exist
}

function appInit() {
  const app = express();
  app.use(cors());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(passport.initialize());
  // eslint-disable-next-line consistent-return
  app.use((req, res, next) => {
    // console.log('mongoose.connection.readyState : ', mongoose.connection.readyState);
    if (mongoose.connection.readyState === 1) next();
    else {
      dbConnection(config.database, status => logger.info(status));
      return res.json({
        statusCode: 500,
        statusMessage: 'Monogodb is disconnected. Trying to reconnect!',
      });
    }
  });
  app.use('/', apiRoutes);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use((err, req, res) => {
    logger.error('error', err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
      statusCode: err.status || 500,
      statusMessage: err.message,
    });
    // render the error page
  });
  return app;
}
module.exports.appInit = appInit;
