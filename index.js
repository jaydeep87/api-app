const app = require('./bin/www');

app.startup();

process.on('SIGTERM', () => {
  // console.log('Received SIGTERM');

  app.shutdown();
});

process.on('SIGINT', () => {
  // console.log('Received SIGINT');

  app.shutdown();
});

process.on('uncaughtException', (err) => {
  // console.log('Uncaught exception');
  // console.error(err);

  app.shutdown(err);
});
