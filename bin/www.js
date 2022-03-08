const debug = require('debug')('app:server');
const http = require('http');
const app = require('../app').appInit();

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};
const port = normalizePort(process.env.PORT || '3000');
/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};


/**
 * Get port from environment and store in Express.
 */

app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
  console.log(`Listening on ${bind}`);
};

/**
 * To Initializing the application and start the server.
 */
function initialize() {
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
}

module.exports.initialize = initialize;

/**
 * This function will close the server.
 */
function close() {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) {
        console.log(`error on server close : ${new Error(err).message}`);
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports.close = close;

/**
 * Starting up the application.
 */
function startup() {
  try {
    // console.log('Initializing web server module');
    initialize();
  } catch (err) {
    // console.error(err);
    console.log(`method :webserver initialize error : ${new Error(err).message}`);
    process.exit(1); // Non-zero failure code
  }
}

module.exports.startup = startup;

async function shutdown(e) {
  let err;
  // console.log('Shutting down');
  try {
    // console.log('Closing web server module');
    console.log('Closing web server module');
    await server.close();
  } catch (error) {
    // console.log('Encountered error', error);
    console.log(`method: closing web server : ${new Error(error).message}`);
    err = error || e;
  }

  // console.log('Exiting process');

  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
}

module.exports.shutdown = shutdown;
