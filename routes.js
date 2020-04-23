var express = require('express'),
router = express.Router();

router.get('/hello', itemCtrl.getWorld);

module.exports = router;