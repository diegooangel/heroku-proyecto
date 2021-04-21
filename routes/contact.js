var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('Contact', { title: 'Contacto', text: 'contactate con nosotros' });
});

module.exports = router;
