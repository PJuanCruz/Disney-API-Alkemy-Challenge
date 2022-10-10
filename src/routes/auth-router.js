const express = require('express');
const authControllers = require('../controllers/auth-controllers');
const {
  registerValidations,
} = require('../middlewares/validations/auth-validations');

const router = express.Router();

router.route('/register')
  .post([...registerValidations], authControllers.register);

router.route('/login')
  .post(authControllers.login);

module.exports = router;
