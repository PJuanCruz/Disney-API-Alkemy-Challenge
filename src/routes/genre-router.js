const express = require('express');
const genreControllers = require('../controllers/genre-controllers');
const authenticateToken = require('../middlewares/authenticate-token');

const router = express.Router();

router.route('/').get([authenticateToken], genreControllers.getGenresList);

module.exports = router;
