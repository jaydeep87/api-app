const router = require('express').Router();
const masterCtrl = require('../controllers/masterCtrl');

router.get('/names', (req, res, next) => masterCtrl.getMasterNames(req, res, next));
router.post('/names', (req, res, next) => masterCtrl.addUpdateMasterNames(req, res, next));
router.get('/', (req, res, next) => masterCtrl.getMasters(req, res, next));
router.post('/', (req, res, next) => masterCtrl.addUpdateMasters(req, res, next));
router.get('/courses', (req, res, next) => masterCtrl.getCourse(req, res, next));
router.post('/courses', (req, res, next) => masterCtrl.addCourse(req, res, next));
router.get('/classes', (req, res, next) => masterCtrl.getClasses(req, res, next));
router.post('/classes', (req, res, next) => masterCtrl.addUpdateClasses(req, res, next));

module.exports = router;
