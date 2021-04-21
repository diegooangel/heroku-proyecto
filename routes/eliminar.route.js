const { Router } = require('express');
const router = new Router();
const {
  getSingleUser
  
} = require('../controllers/eliminar.controller');


router.get('/:id', getSingleUser);


module.exports = router;
