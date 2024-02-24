const router = require('express').Router();
const teacherCtrl = require('../controllers/teacherCtrl');
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

router.use((req, res, next) => {
  logger.info('Requested URL ',`${req.protocol}://${req.hostname}${req.originalUrl} at ${new Date()}`)
  next()
})

router.get('/',
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => teacherCtrl.teachers(req, res, next));
router.get('/master',
  // (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => teacherCtrl.teachersMaster(req, res, next));
router.put('/activate/:id',
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => teacherCtrl.activateTeacher(req, res, next));
router.put('/in-activate/:id',
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => teacherCtrl.inActivateTeacher(req, res, next));

router.post('/add-update',
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => teacherCtrl.validateTeacherRequest(req, res, next),
  (req, res, next) => teacherCtrl.addUpdate(req, res, next));

router.post('/upload-photo',
upload.single('profile_image'),
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => teacherCtrl.updateProfileImage(req, res, next));

module.exports = router;
