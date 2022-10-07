const express = require('express');
const genreControllers = require('../controllers/genre-controllers');

const router = express.Router();

router.route('/').get(genreControllers.getAll).post(genreControllers.create);

module.exports = router;
