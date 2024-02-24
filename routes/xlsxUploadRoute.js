const router = require('express').Router();
const upload = require("../middlewares/upload");
// const filePath = require('../config/filePath');
// const multer = require('multer');
// const upload = multer({ dest: filePath.uploadFilePath })


const uploadCtrl = require('../controllers/uploadCtrl');
const processExcel = require('../controllers/processExcelCtl');


// upload file by storing file and then load the data
router.post('/small/uploadWithFileStore',
    upload.single("file"),
    (req, res, next) => uploadCtrl.uploadXLSXNew(req, res, next) );


    // upload file without storing file any where
router.post('/big/uploadWithoutFileStore', 
// upload.single("file"),
(req, res) => processExcel.processExcel(req, res));


router.post('/big/readStoreFileAndProcess',
upload.single("file"),
(req, res, next) => uploadCtrl.uploadFileViaStreaming(req, res, next)
)

module.exports = router;
