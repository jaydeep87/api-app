const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
// load up the user model
// const User = require('../models/userMdl');

module.exports = {
  users: (req, res, next) => {
    try {
      mongoose.model(collConfig.user.name).find({}).then(data => res.json({ sc: 200, data, mt: 'Success', sm: 'Success!' }))
          .catch((err) => {
            next(err);
          });
    } catch (err) {
      next(err);
    }
  },
  signUp: (req, res, next) => {
    try {
      if (!req.body.email || !req.body.password) {
        res.status(401).send({ sc: 401, sm: 'Email and password is required for login!', mt: 'Validation!' });
      } else {
        // console.log(JSON.stringify(req.body));
        const userObj = {
          mobile: req.body.mobile,
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
        };
        // save the user
        mongoose.model(collConfig.user.name).create(userObj).then(data => res.json({ sc: 200, data, mt: 'Registration', sm: 'Registration was success!' }))
          .catch((err) => {
            next(err);
          });
      }
    } catch (err) {
      next(err);
    }
  },
  signIn: (req, res, next) => {
    mongoose.model(collConfig.user.name).findOne({
      email: req.body.email
    }, function (err, user) {
      if (err) throw err;
      if (!user) {
        res.status(401).send({ sc: 401, sm: 'Authentication failed. User not found.', mt: 'Authentication Failed!' });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            const token = jwt.sign(user.toJSON(), config.secret, {
              expiresIn: config.expiresIn, 
            });
            // return the information including token as JSON
            res.json({ sc:200, sm: 'Login success!', mt:'Logged in!', token: token, user:user.toJSON() });
          } else {
            res.status(401)
              .send({ sc: 401, sm: 'Authentication failed. Wrong password!', mt: 'Authentication failed!' });
          }
        });
      }
    });
  },
};
