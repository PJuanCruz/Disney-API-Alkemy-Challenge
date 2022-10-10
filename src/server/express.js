const express = require('express');
const morgan = require('morgan');
const authRouter = require('../routes/auth-router');
const genreRouter = require('../routes/genre-router');
const movieRouter = require('../routes/movie-router');
const characterRouter = require('../routes/character-router');
const errorHandler = require('../middlewares/error-handler');
const notFound = require('../utils/not-found');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/genres', genreRouter);
app.use('/movies', movieRouter);
app.use('/characters', characterRouter);

app.use(notFound);

app.use(errorHandler);

module.exports = app;
