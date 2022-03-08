const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const config = require('../config/database');
// load up the user model
// const User = require('../models/userMdl');

module.exports = {
  users: (req, res, next) => {
    try {
      res.json({
        statusCode: 200,
        statusMessage: 'user APi called',
      });
    } catch (err) {
      next(err);
    }
  },
  signUp: (req, res, next) => {
    try {
      if (!req.body.mobile || !req.body.password) {
        res.json({ success: false, msg: 'Please pass mobile and password.' });
      } else {
        const userObj = {
          mobile: req.body.mobile,
          password: req.body.password,
          fName: req.body.fName,
        };
        // save the user
        mongoose.model(collConfig.user.name).create(userObj).then(data => res.json({ statusCode: 200, data, statusMessage: 'Successful created new user.' }))
          .catch((err) => {
            next(err);
          });
      }
    } catch (err) {
      next(err);
    }
  },
  // signIn: (req, res, next) => {
  //   User.findOne({
  //     mobile: req.body.mobile,
  //   }, function(err, user) {
  //     if (err) throw err;

  //     if (!user) {
  //       res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
  //     } else {
  //       // check if password matches
  //       user.comparePassword(req.body.password, function (err, isMatch) {
  //         if (isMatch && !err) {
  //           // if user is found and password is right create a token
  //           const token = jwt.sign(user.toJSON(), config.secret, {
  //             expiresIn: config.expiresIn, // 1 week
  //           });
  //           // return the information including token as JSON
  //           res.json({success: true, token: 'JWT ' + token});
  //         } else {
  //           res.status(401)
  // .send({success: false, msg: 'Authentication failed. Wrong password.'});
  //         }
  //       });
  //     }
  //   });
  // },
};
