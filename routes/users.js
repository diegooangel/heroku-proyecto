const { Router } = require('express');
const router = new Router();
const {
  getUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  sendComment
} = require('../controllers/users.controller');

router.get('/', getUsers);
router.get('/:id', getSingleUser);
router.post('/new', sendComment);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);


module.exports = router;
