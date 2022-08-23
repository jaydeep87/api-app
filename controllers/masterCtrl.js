const mongoose = require('mongoose');
const jsonSchema = require('../config/schema');
const JSONValidatorService = require('../services/jsonValidatorService');
const util = require('../helpers/util');
module.exports = {
    getCourse: (req, res, next) => {
        try {
            mongoose.model(collConfig.course.name).find({ isActive: true }).then(data => {
                return res.json({
                    data: data,
                    statusCode: 200,
                    statusMessage: 'Success!'
                })
            }).catch(err => next(err));
        } catch (err) {
            next(err);
        }
    },
    addCourse: (req, res, next) => {
        try {
            const clientData = req.body;
            mongoose.model(collConfig.course.name).create(clientData).then(data => {
                return res.json({
                    data: data,
                    statusCode: 200,
                    statusMessage: 'Success!'
                })
            }).catch(err => next(err));
        } catch (err) {
            next(err);
        }
    },
    getClasses: (req, res, next) => {
        try {
            const queryObj = req.query;
            let searchQuery = {};
            if (queryObj.searchKeyWord) {
                searchQuery = { "name": new RegExp(queryObj.searchKeyWord, "i") }
            }
            mongoose.model(collConfig.class.name).find(searchQuery).then(data => {
                return res.json({
                    sc: 200, data, totalCount: data.length, mt: 'Success', sm: 'Success!'
                })
            }).catch(err => next(err));
        } catch (err) {
            next(err);
        }
    },
    addUpdateClasses: (req, res, next) => {
        try {
            const clientData = util.removeENUKeys(req.body);
            JSONValidatorService.jvs(req, res, jsonSchema.class.addUpdate, clientData, function (err, data) {
              if (data) {
                const classObj = data;
                if (classObj["_id"]) {
                  mongoose.model(collConfig.class.name).findByIdAndUpdate(classObj["_id"], classObj, { new: true })
                    .then(result => res.json({ sc: 200, mt: 'Updated', data: result, sm: 'Class record updated!' }))
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
                  mongoose.model(collConfig.class.name).create(classObj)
                    .then(result => res.json({ sc: 200, mt: 'Created', data: result, sm: 'Class record created!' }))
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
    }
}
