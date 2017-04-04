var router = require('express').Router();

router.use('/home', require('./home'));
router.use('/historic', require('./historic'));
router.use('/live', require('./live'));

module.exports = router;