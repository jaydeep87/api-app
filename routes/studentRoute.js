const router = require('express').Router();
const studentCtrl = require('../controllers/studentCtrl');
const authService = require('../services/authService');
const multer = require('multer');
const uuidv1 = require('uuid');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file.fieldname);
    const dir = './public/images/uploads/' + file.fieldname;
    fse.ensureDirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, uuidv1()+file.originalname);
  }
});
const upload = multer({storage: storage});
router.get('/',
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => studentCtrl.students(req, res, next));
router.put('/activate/:id',
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => studentCtrl.activateStudent(req, res, next));
router.put('/in-activate/:id',
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => studentCtrl.inActivateStudent(req, res, next));

router.post('/add-update',
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => studentCtrl.addUpdate(req, res, next));

router.post('/upload-photo',
upload.single('profile_image'),
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => studentCtrl.updateProfileImage(req, res, next));

module.exports = router;
