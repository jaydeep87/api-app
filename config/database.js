module.exports = {
    'secret':'nodeauthsecret',
    // 'database': 'mongodb://localhost:27017/devdb',
    'database': process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/devdb',
    'expiresIn': '12h', // 12 hrs
  };
  