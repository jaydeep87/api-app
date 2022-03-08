const winston = require('winston');

const tsFormat = () => `${(new Date()).toLocaleDateString()} - ${(new Date()).toLocaleTimeString()}`;
const level = process.env.LOG_LEVEL || 'debug';

/**
     *
     *  { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
     */
const spogLogger = winston.createLogger({
  transports: [
    new (winston.transports.File)({
      level,
      handleExceptions: true,
      timestamp: tsFormat,
      filename: `logs/logs_${new Date().getDate()}_${new Date().getMonth() + 1}.log`,
      json: true,
      colorize: true,
    }),
  ],
});

const convertToString = (val) => {
  let r = '';
  try {
    r = JSON.stringify(val);
  } catch (err) { return r; }
  return r;
};


const checkJSON = (m) => {
  let msg;
  if (typeof m === 'object') {
    try { msg = JSON.stringify(m); } catch (err) { return false; }
  }

  if (typeof m === 'string') {
    try { msg = JSON.parse(m); } catch (err) { return false; }
  }

  if (typeof msg !== 'object') { return false; }
  return true;
};

const constructMessage = (info, message) => {
  let text;
  if (message != null && message !== undefined) {
    text = `${info} : ${(checkJSON(message) ? convertToString(message) : message)}`;
  } else {
    text = info;
  }
  return text;
};

module.exports = () => {
  const logger = {
    error: (error, message) => {
      spogLogger.error(constructMessage(error, message));
    },
    info: (info, message) => {
      spogLogger.info(constructMessage(info, message));
    },
    warn: (warn, message) => {
      spogLogger.warn(constructMessage(warn, message));
    },
    debug: (debug, message) => {
      spogLogger.debug(constructMessage(debug, message));
    },
    verbose(verbose, message) {
      spogLogger.verbose(constructMessage(verbose, message));
    },
    silly(silly, message) {
      spogLogger.silly(constructMessage(silly, message));
    },
  };
  return logger;
};
