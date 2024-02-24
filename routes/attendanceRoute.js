const router = require('express').Router();
const attendanceCtrl = require('../controllers/attendanceCtrl');
const authService = require('../services/authService');

router.use((req, res, next) => {
  logger.info('Requested URL ',`${req.protocol}://${req.hostname}${req.originalUrl} at ${new Date()}`)
  next()
})

router.get('/',
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => attendanceCtrl.attendances(req, res, next));
  router.get('/by-class',
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => attendanceCtrl.attendancesByClass(req, res, next));
router.post('/add-update',
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => attendanceCtrl.addUpdate(req, res, next));

module.exports = router;
