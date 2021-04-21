var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('update', { title: 'update'});
});

module.exports = router;
