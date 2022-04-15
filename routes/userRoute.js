const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const authService = require('../services/authService');

router.get('/',
  (req, res, next) => authService.auth(req, res, next),
  (req, res, next) => userCtrl.users(req, res, next));

router.post('/signup', (req, res, next) => userCtrl.signUp(req, res, next));
router.post('/login', (req, res, next) => userCtrl.signIn(req, res, next));

module.exports = router;
