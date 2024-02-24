const mongoose = require('mongoose');
const async = require('async');
const jsonSchema = require('../config/schema');
const JSONValidatorService = require('../services/jsonValidatorService');
const util = require('../helpers/util');

module.exports = {
  staffs: (req, res, next) => {
    try {
      const queryObj = req.query;
      let searchQuery = {};
      let skip = 0;
      let limit = 5
      if (queryObj.page && queryObj.size) {
        skip = parseInt(queryObj.page * queryObj.size);
        limit = parseInt(queryObj.size);
      }
      if (queryObj.searchKeyWord) {
        // searchQuery = { "name": new RegExp(queryObj.searchKeyWord, "i") }
        searchQuery = {
          $or: [{ name: new RegExp(queryObj.searchKeyWord, "i") }, { uid: new RegExp(queryObj.searchKeyWord, "i") }]
        }
      }
      mongoose.model(collConfig.staff.name)
        .aggregate([
          {
            "$facet": {
              "data": [
                { "$match": searchQuery },
                { "$sort": { name: 1 } },
                { "$skip": skip },
                { "$limit": limit },
              ],
              "totalCount": [
                { "$match": searchQuery },
                { "$count": "count" }
              ]
            }
          }
        ])
        // find(searchQuery).limit(limit).skip(skip).sort({ _id: -1 })
        .then(resultData => {
          let data = [];
          let totalCount = 0;
          if (resultData && resultData.length) {
            data = resultData[0]['data'];
            totalCount = resultData[0]['totalCount'].length ? resultData[0]['totalCount'][0]['count'] : 0;
          }
          return res.json({ sc: 200, data, totalCount, mt: 'Success', sm: 'Success!' })
        }
        )
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  },
  staffsMaster: (req, res, next) => {
    try {
      let searchQuery = { "isActive": true };
      mongoose.model(collConfig.staff.name)
        .find(searchQuery, collConfig.staff.masterProject).sort({ name: 1 })
        .then(data => {
          return res.json({ sc: 200, data, mt: 'Success', sm: 'Success!' })
        }
        )
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  },
  activateStaff: (req, res, next) => {
    try {
      const staffId = req.params['id'];
      if (staffId) {
        let updateObj = { isActive: true };
        mongoose.model(collConfig.staff.name).findByIdAndUpdate(staffId, updateObj)
          .then(data => res.json({ sc: 200, data, mt: 'Success', sm: 'Success!' }))
          .catch((err) => {
            next(err);
          });
      } else {
        res.status(500).send({ sc: 500, sm: 'Staff Id not found!', mt: 'Error!' });
      }
    } catch (err) {
      next(err);
    }
  },
  inActivateStaff: (req, res, next) => {
    try {
      const staffId = req.params['id'];
      if (staffId) {
        let updateObj = { isActive: false };
        mongoose.model(collConfig.staff.name).findByIdAndUpdate(staffId, updateObj)
          .then(data => res.json({ sc: 200, data, mt: 'Success', sm: 'Success!' }))
          .catch((err) => {
            next(err);
          });
      } else {
        res.status(500).send({ sc: 500, sm: 'Staff Id not found!', mt: 'Error!' });
      }
    } catch (err) {
      next(err);
    }
  },
  validateStaffRequest: (req, res, next) => {
    try {
      const clientData = util.removeENUKeys(req.body);
      JSONValidatorService.jvs(req, res, jsonSchema.staff.addUpdate, clientData, function (err, data) {
        if (data) {
          const staffObj = data;
          if (staffObj["_id"]) {
            mongoose.model(collConfig.staff.name).findByIdAndUpdate(staffObj["_id"], staffObj, { new: true })
              .then(result => res.json({ sc: 200, mt: 'Updated', data: result, sm: 'staff record updated!' }))
              .catch((err) => {
                // next(err);
                return res.status(500).json({
                  sc: 500,
                  mt: 'Error!',
                  sm: 'Found invalid request!',
                  err: err,
                  schema: jsonSchema.staff.addUpdate
                });
              });
          } else {
            const possibleInitials = util.get3CharInitials(staffObj.name);
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
                    staffObj.uid = allowedInitial;
                    req.staffObj = staffObj;
                    next();
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
        } else {
          return res.json(err);
        }
      });
    } catch (err) {
      next(err);
    }
  },
  addUpdate: (req, res, next) => {
    try {
      const staffObj = req.staffObj;
      staffObj.email = staffObj.email ? staffObj.email.toLowerCase() : `${staffObj.uid.toLowerCase()}@gmail.com`
      if (staffObj) {
        async.parallel({
          user: function (ucb) {
            const userObj = {
              mobile: staffObj.mobile,
              email: staffObj.email,
              password: `${staffObj.uid}@${staffObj.mobile}`,
              name: staffObj.name,
              userType: 'staff',
              uid: staffObj.uid
            }
            let searchQuery = {
              // name: req.body.name,
              email: userObj.email,
              mobile: userObj.mobile
            };
            mongoose.model(collConfig.user.name).findOne(searchQuery)
              .then(userData => {
                if (userData) {
                  ucb('Hey! You are registered user.', null);
                } else {
                  // save the user
                  mongoose.model(collConfig.user.name).create(userObj)
                    .then(data => ucb(null, data))
                    .catch((err) => {
                      ucb(err, null)
                    });
                }
              })
              .catch((err) => {
                ucb(err, null);
              });
          },
          staff: function (tcb) {
            let searchQuery = {
              // name: req.body.name,
              email: staffObj.email,
              mobile: staffObj.mobile
            };
            mongoose.model(collConfig.staff.name).findOne(searchQuery)
              .then(staffData => {
                if (staffData) {
                  tcb('Hey! You are registered user.', null);
                } else {
                  // save the user
                  mongoose.model(collConfig.staff.name).create(staffObj)
                    .then(data => tcb(null, data))
                    .catch((err) => {
                      tcb(err, null)
                    });
                }
              }).catch((err) => {
                tcb(err, null);
              });
          }
        }, function (err, results) {
          if (err) {
            next(err);
          } else {
            return res.json({ sc: 200, mt: 'Created', data: results.staff, sm: 'Staff record created!' })
          }
        });
      } else {
        return res.status(500).json({
          sc: 500,
          mt: 'Error!',
          sm: 'Something went wrong, required data not found.'
        });
      }
    } catch (err) {
      next(err);
    }
  },
  updateProfileImage: (req, res, next) => {
    console.log(req);
  }
};
