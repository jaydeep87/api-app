const mongoose = require('mongoose');
const async = require('async');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const util = require('../helpers/util');
// load up the user model
// const User = require('../models/userMdl');

module.exports = {
  users: (req, res, next) => {
    try {
      const queryObj = req.query;
      let searchQuery = {};
      if (queryObj.searchKeyWord) {
        // searchQuery = { "name": new RegExp(queryObj.searchKeyWord, "i") }
        searchQuery = {
          $or: [{ name: new RegExp(queryObj.searchKeyWord, "i") }, { uid: new RegExp(queryObj.searchKeyWord, "i") }]
        }
      }
      mongoose.model(collConfig.user.name).find(searchQuery).limit(5).sort({ _id: -1 })
        .then(data => res.json({ sc: 200, data, mt: 'Success', sm: 'Success!' }))
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

        let searchQuery = {
          // name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile
        };
        mongoose.model(collConfig.user.name).findOne(searchQuery)
          .then(userData => {
            if (userData) {
              res.status(500).send({ sc: 500, sm: 'Hey! You are registered user.', mt: 'Authentication Failed!' });
            } else {
              const possibleInitials = util.get3CharInitials(userObj.name);
              if (possibleInitials.length) {
                let allowedInitial = "";
                async.forEachSeries(possibleInitials, function (initial, cb) {
                  if (!allowedInitial) {
                    mongoose.model(collConfig.user.name).find({ uid: initial })
                      .then(data => {
                        if (data && data.length) {
                          cb();
                        } else {
                          allowedInitial = initial;
                          cb();
                        }
                      })
                      .catch((err) => {
                        cb();
                      });
                  } else {
                    cb();
                  }
                }, function (err) {
                  if (err) {
                    next(err);
                  } else {
                    if (allowedInitial) {
                      userObj.uid = allowedInitial;
                      // save the user
                      mongoose.model(collConfig.user.name).create(userObj).then(data => res.json({ sc: 200, data, mt: 'Registration', sm: 'Registration was success, Please contact to Admin for further Action!' }))
                        .catch((err) => {
                          // next(err);
                          return res.status(500).json({
                            sc: 500,
                            mt: 'Error!',
                            sm: 'Found invalid request!'
                          });
                        });
                      // next();
                    } else {
                      return res.status(500).json({
                        sc: 500,
                        mt: 'Error!',
                        sm: 'uid could not be created, please add some more suffix or prefix in name.'
                      });
                    }
                  }
                });
              } else {
                return res.status(500).json({
                  sc: 500,
                  mt: 'Error!',
                  sm: 'uid could not be created, please add some more suffix or prefix in name.'
                });
              }
            }
          })
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
        if (user.isActive) {
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              const token = jwt.sign(user.toJSON(), config.secret, {
                expiresIn: config.expiresIn,
              });
              // return the information including token as JSON
              res.json({ sc: 200, sm: 'Login success!', mt: 'Logged in!', token: token, user: user.toJSON() });
            } else {
              res.status(401)
                .send({ sc: 401, sm: 'Authentication failed. Wrong password!', mt: 'Authentication failed!' });
            }
          });
        } else {
          res.status(401)
            .send({ sc: 401, sm: 'Authentication failed. Please contact to Admin!', mt: 'Authentication failed!' });
        }
      }
    });
  },
  activateUser: (req, res, next) => {
    try {
      const userId = req.params['id'];
      if (userId) {
        let updateObj = { isActive: true };
        mongoose.model(collConfig.user.name).findByIdAndUpdate(userId, updateObj)
          .then(data => res.json({ sc: 200, data, mt: 'Success', sm: 'Success!' }))
          .catch((err) => {
            next(err);
          });
      } else {
        res.status(500).send({ sc: 500, sm: 'User Id not found!', mt: 'Error!' });
      }
    } catch (err) {
      next(err);
    }
  },
  inActivateUser: (req, res, next) => {
    try {
      const userId = req.params['id'];
      if (userId) {
        let updateObj = { isActive: false };
        mongoose.model(collConfig.user.name).findByIdAndUpdate(userId, updateObj)
          .then(data => res.json({ sc: 200, data, mt: 'Success', sm: 'Success!' }))
          .catch((err) => {
            next(err);
          });
      } else {
        res.status(500).send({ sc: 500, sm: 'User Id not found!', mt: 'Error!' });
      }
    } catch (err) {
      next(err);
    }
  }
};
