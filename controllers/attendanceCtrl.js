const mongoose = require('mongoose');
const jsonSchema = require('../config/schema');
const JSONValidatorService = require('../services/jsonValidatorService');
const util = require('../helpers/util');
// load up the user model
// const User = require('../models/userMdl');

module.exports = {
  attendances: (req, res, next) => {
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
      mongoose.model(collConfig.attendance.name)
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
  attendancesByClass: (req, res, next) => {
    try {
      const queryObj = req.query;
      let searchQuery = {};
      if (queryObj.classId) {
        searchQuery = {
          "class._id": queryObj.classId
        }
      }
      let skip = 0;
      let limit = 31
      if (queryObj.page && queryObj.size) {
        skip = parseInt(queryObj.page * queryObj.size);
        limit = parseInt(queryObj.size);
      }
      mongoose.model(collConfig.attendance.name)
      .aggregate([
        {
          "$facet": {
            "data": [
              { "$match": searchQuery },
              { "$sort": { _id: -1, date: -1 } },
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
  addUpdate: (req, res, next) => {
    try {
      const clientData = util.removeENUKeys(req.body);
      JSONValidatorService.jvs(req, res, jsonSchema.attendance.addUpdate, clientData, function (err, data) {
        if (data) {
          const attendanceObj = data;
          if (attendanceObj["_id"]) {
            mongoose.model(collConfig.attendance.name).findByIdAndUpdate(attendanceObj["_id"], attendanceObj, { new: true })
              .then(result => res.json({ sc: 200, mt: 'Updated', data: result, sm: 'Attendance record updated!' }))
              .catch((err) => {
                // next(err);
                return res.status(500).json({
                  sc: 500,
                  mt: 'Error!',
                  sm: 'Found invalid request!',
                  err: err,
                  schema: jsonSchema.attendance.addUpdate
                });
              });
          } else {
            // // attendanceObj.date = new Date(attendanceObj.date);
            let newData = attendanceObj.date.replace(/(\d+[-])(\d+[-])/, '$2$1');
            let dateObj = new Date(newData);
            attendanceObj.date = dateObj;
            mongoose.model(collConfig.attendance.name).create(attendanceObj)
              .then(result => res.json({ sc: 200, mt: 'Created', data: result, sm: 'Attendance record created!' }))
              .catch((err) => {
                // next(err);
                return res.status(500).json({
                  sc: 500,
                  mt: 'Error!',
                  sm: 'Found invalid request!',
                  err: err,
                  schema: jsonSchema.attendance.addUpdate
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
  }
};
