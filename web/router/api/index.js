var router = require('express').Router();

router.use('/user', require('./user'));
router.use('/infoplayer', require('./infoplayer'));

module.exports = router;
