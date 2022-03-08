const router = require('express').Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  try {
    res.sendFile('../public/index.html', { root: __dirname });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
