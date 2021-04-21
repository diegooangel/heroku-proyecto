const { text } = require('express');
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inicio', text: 'A veces un paseo en bicicleta es lo unico que necesitas' });
});

module.exports = router;
