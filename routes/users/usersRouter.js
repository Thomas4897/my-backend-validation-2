var express = require('express');
var router = express.Router();
const { createUser, userLogin } = require('./controller/usersController');
const { checkIsEmpty } = require('./lib/authMiddleware/checkIsEmpty');
const { validateCreateData } = require('./lib/authMiddleware/validateCreateData');
const { validateLoginData } = require('./lib/authMiddleware/validateLoginData');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create-user', checkIsEmpty, validateCreateData, createUser);

router.post('/login', checkIsEmpty, validateLoginData, userLogin);

module.exports = router;