const router = require('express').Router();
const masterCtrl = require('../controllers/masterCtrl');

router.get('/courses', (req, res, next) => masterCtrl.getCourse(req, res, next));
router.post('/courses', (req, res, next) => masterCtrl.addCourse(req, res, next));
router.get('/classes', (req, res, next) => masterCtrl.getClasses(req, res, next));
router.post('/classes', (req, res, next) => masterCtrl.addUpdateClasses(req, res, next));

module.exports = router;
