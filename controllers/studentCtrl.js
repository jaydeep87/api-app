const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const jsonSchema = require('../config/schema');
const JSONValidatorService = require('../services/jsonValidatorService');
const util = require('../helpers/util');
// load up the user model
// const User = require('../models/userMdl');

module.exports = {
  students: (req, res, next) => {
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
        searchQuery = { "name": new RegExp(queryObj.searchKeyWord, "i") }
      }
      mongoose.model(collConfig.student.name)
        .aggregate([
          {
            "$facet": {
              "data": [
                { "$match": searchQuery },
                { "$sort": { _id: -1 } },
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
          let data =[];
          let totalCount = 0;
          if(resultData && resultData.length){
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
  activateStudent: (req, res, next) => {
    try {
      const studentId = req.params['id'];
      if (studentId) {
        let updateObj = { isActive: true };
        mongoose.model(collConfig.student.name).findByIdAndUpdate(studentId, updateObj)
          .then(data => res.json({ sc: 200, data, mt: 'Success', sm: 'Success!' }))
          .catch((err) => {
            next(err);
          });
      } else {
        res.status(500).send({ sc: 500, sm: 'Student Id not found!', mt: 'Error!' });
      }
    } catch (err) {
      next(err);
    }
  },
  inActivateStudent: (req, res, next) => {
    try {
      const studentId = req.params['id'];
      if (studentId) {
        let updateObj = { isActive: false };
        mongoose.model(collConfig.student.name).findByIdAndUpdate(studentId, updateObj)
          .then(data => res.json({ sc: 200, data, mt: 'Success', sm: 'Success!' }))
          .catch((err) => {
            next(err);
          });
      } else {
        res.status(500).send({ sc: 500, sm: 'Student Id not found!', mt: 'Error!' });
      }
    } catch (err) {
      next(err);
    }
  },
  addUpdate: (req, res, next) => {
    try {
      const clientData = util.removeENUKeys(req.body);
      JSONValidatorService.jvs(req, res, jsonSchema.student.addUpdate, clientData, function (err, data) {
        if (data) {
          const studentObj = data;
          if (studentObj["_id"]) {
            mongoose.model(collConfig.student.name).findByIdAndUpdate(studentObj["_id"], studentObj, { new: true })
              .then(result => res.json({ sc: 200, mt: 'Updated', data: result, sm: 'Student record updated!' }))
              .catch((err) => {
                // next(err);
                return res.status(500).json({
                  sc: 500,
                  mt: 'Error!',
                  sm: 'Found invalid request!',
                  err: err
                });
              });
          } else {
            mongoose.model(collConfig.student.name).create(studentObj)
              .then(result => res.json({ sc: 200, mt: 'Created', data: result, sm: 'Student record created!' }))
              .catch((err) => {
                // next(err);
                return res.status(500).json({
                  sc: 500,
                  mt: 'Error!',
                  sm: 'Found invalid request!',
                  err: err
                });
              });
          }
        } else {
          res.json(err);
        }
      });
    } catch (err) {
      next(err);
    }
  },
  updateProfileImage: (req, res, next) => {
    console.log(req);
  }
};
