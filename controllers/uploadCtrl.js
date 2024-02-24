const mongoose = require('mongoose');
const filePath = require('../config/filePath');
// const fs = require('fs')
// const multer = require('multer')
const XLSXWriteStream = require('xlsx-write-stream');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
// const storageCustom = require('../middlewares/customStorageEngine')
// for custom multer storage
const multer = require('multer')
const storageCustom = require('../middlewares/customStorageEngine');
const helper = require('../helpers/processExcel')

module.exports = {
  uploadXLSX: (req, res, next) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }
      let path = filePath.uploadFilePath + req.file.filename;
      console.log(path);
      req.xlsxWriter = new XLSXWriteStream();

      req.xlsxWriter.setInputStream(
        // stream of input file
        path.stream
          // convert excel to object stream
          .pipe(excel())
          //process object stream and return formated object for xlsxWriter
          .pipe(getTransformObject())
      );

      // readXlsxFile(path).then((rows) => {
      //     // skip header
      //     rows.shift();

      //     let courses = [];
      //     let counter = 0;
      //     rows.forEach((row) => {
      //     //   let course = {
      //     //     name: row[0],
      //     //     description: row[1],
      //     //     courseURL: row[2],
      //     //     coursePeriod: row[3],
      //     //   };
      //       console.log(`${counter++} ::   ${row[0]}`)
      //     //   courses.push(course);
      //     });

      //     // mongoose.model(collConfig.course.name).insertMany(courses).then(data => {
      //     //     return res.json({
      //     //         // data: data,
      //     //         statusCode: 200,
      //     //         statusMessage: 'Success!'
      //     //     })
      //     // }).catch(err => next(err));

      // }).catch(error => {
      //   console.log(error);
      //   res.status(500).send({
      //     message: "Could not upload the file: " + req.file.originalname,
      //   });
      // })
    } catch (err) {
      next(err);
    }
  },
  uploadImage: (req, res, next) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }
      let path = filePath.uploadFilePath + req.file.filename;
      console.log(path);
      req.xlsxWriter = new XLSXWriteStream();

      req.xlsxWriter.setInputStream(
        // stream of input file
        path.stream
          // convert excel to object stream
          .pipe(excel())
          //process object stream and return formated object for xlsxWriter
          .pipe(getTransformObject())
      );

      // readXlsxFile(path).then((rows) => {
      //     // skip header
      //     rows.shift();

      //     let courses = [];
      //     let counter = 0;
      //     rows.forEach((row) => {
      //     //   let course = {
      //     //     name: row[0],
      //     //     description: row[1],
      //     //     courseURL: row[2],
      //     //     coursePeriod: row[3],
      //     //   };
      //       console.log(`${counter++} ::   ${row[0]}`)
      //     //   courses.push(course);
      //     });

      //     // mongoose.model(collConfig.course.name).insertMany(courses).then(data => {
      //     //     return res.json({
      //     //         // data: data,
      //     //         statusCode: 200,
      //     //         statusMessage: 'Success!'
      //     //     })
      //     // }).catch(err => next(err));

      // }).catch(error => {
      //   console.log(error);
      //   res.status(500).send({
      //     message: "Could not upload the file: " + req.file.originalname,
      //   });
      // })
    } catch (err) {
      next(err);
    }
  },
  uploadXLSXNew: (req, res, next) => {
    try {
      let exceltojson;
      if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
        exceltojson = xlsxtojson;
        } else {
        exceltojson = xlstojson;
          }
        let path = filePath.uploadFilePath + req.file.filename;
        exceltojson({
            input: path,
            output: null, //since we don't need output.json
            lowerCaseHeaders: true
        }, function (err, result) {
            if (err) {
                return res.json({ error_code: 1, err_desc: err, data: null });
            }
            res.json({ error_code: 0, err_desc: null, data: result.length });
        });
    } catch (e) {
      next(e)
        // res.json({ error_code: 1, err_desc: "Corupted excel file" });
    }

  },
  uploadFileViaStreaming : (req, res, next) => {
    try {
      let path = filePath.uploadFilePath + req.file.filename;
      console.log(path)
      helper.processExcelFile(path).then(result => {
        console.log(result);
        res.json({
          sc:200,
          sm:'done'
        })
      }).catch(e => {
        next(e);
      })
    } catch(e) {
      next(e);
    }
  }
}
