const router = require('express').Router();
const masterCtrl = require('../controllers/masterCtrl');

router.get('/course',
  (req, res, next) => masterCtrl.getCourse(req, res, next));
router.post('/course',
  (req, res, next) => masterCtrl.addCourse(req, res, next));

module.exports = router;
