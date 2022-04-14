const router = require('express').Router();
const masterCtrl = require('../controllers/masterCtrl');

router.get('/courses', (req, res, next) => masterCtrl.getCourse(req, res, next));
router.post('/courses', (req, res, next) => masterCtrl.addCourse(req, res, next));

module.exports = router;
