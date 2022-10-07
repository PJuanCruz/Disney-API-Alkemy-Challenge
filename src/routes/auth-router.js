const express = require('express');
const authControllers = require('../controllers/auth-controllers');
const { postRegisterValidations } = require('../middlewares/validations');

const router = express.Router();

router.route('/register')
  .post(postRegisterValidations, authControllers.register);

router.route('/login')
  .post(authControllers.login);

module.exports = router;
