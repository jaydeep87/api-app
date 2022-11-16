const router = require('express').Router();
const attendanceCtrl = require('../controllers/attendanceCtrl');
const authService = require('../services/authService');

router.use((req, res, next) => {
  logger.info('Requested URL ',`${req.protocol}://${req.hostname}${req.originalUrl} at ${new Date()}`)
  next()
})

router.get('/',
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => attendanceCtrl.students(req, res, next));
  router.get('/by-class',
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => attendanceCtrl.studentsByClass(req, res, next));
router.put('/activate/:id',
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => attendanceCtrl.activateStudent(req, res, next));
router.put('/in-activate/:id',
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => attendanceCtrl.inActivateStudent(req, res, next));

router.post('/add-update',
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => attendanceCtrl.addUpdate(req, res, next));

module.exports = router;
