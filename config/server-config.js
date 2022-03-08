require('dotenv').config(); // For dev environment.

module.exports = {
  port: process.env.PORT || 8080,
  hostname: '0.0.0.0',
  // disableHostCheck: true
};
