const { body, param } = require('express-validator');
const BadRequest = require('../../errors/bad-request');
const userServices = require('../../services/user-services');
const movieServices = require('../../services/movie-services');
const genreServices = require('../../services/genre-services');
const characterServices = require('../../services/character-services');

const isEmailValid = body('email')
  .normalizeEmail()
  .isEmail()
  .withMessage('El formato del email no es válido')
  .custom(async (email) => {
    const user = await userServices.getUserByEmail(email);
    if (user) {
      throw new BadRequest(`El email ${email} ya está siendo utilizado`);
    }
  });

const isPasswordValid = body('password')
  .isStrongPassword()
  .withMessage(
    'La contraseña debe tener al menos: 8 caracteres, una letra mayúscula, una mínuscula, un número, un símbolo',
  )
  .isLength({ max: 32 })
  .withMessage('La contraseña no puede tener más de 32 caracteres');

const isMovieIdValid = param('movieId')
  .isInt({ min: 1 })
  .withMessage('El Id es inválido');

const isImageUrlValid = body('imageUrl')
  .optional()
  .isURL()
  .withMessage('La imagen debe ser una URL válida');

const isTitleValid = body('title')
  .ltrim()
  .rtrim()
  .notEmpty()
  .withMessage('El título es requerido')
  .isLength({ max: 64 })
  .withMessage('El título no puede tener más de 64 caracteres')
  .custom(async (title, { req }) => {
    const { method } = req;
    const movie = await movieServices.getMovieByTitle(title);
    if (method === 'POST' && movie) {
      throw new BadRequest(
        `Ya existe una película o serie con el título ${title}`,
      );
    }
    const { movieId } = req.params;
    if (method === 'PUT' && movie && movie.movieId !== parseInt(movieId, 10)) {
      throw new BadRequest(
        `Ya existe una película o serie con el título ${title}`,
      );
    }
  });

const isReleaseDateValid = body('releaseDate')
  .notEmpty()
  .withMessage('La fecha de estreno es requerida')
  .custom(async (releaseDate) => {
    if (!/\d{4}-\d{2}-\d{2}/.test(releaseDate)) {
      throw new BadRequest(
        'El formato de la fecha de estreno debe ser YYYY-MM-DD',
      );
    }
  })
  .custom(async (releaseDate) => {
    const [inputYear, inputMonth, inputDay] = releaseDate.split('-');
    const date = new Date(`${releaseDate}T00:00:00`);
    if (
      date.getFullYear() !== parseInt(inputYear, 10)
      || date.getMonth() + 1 !== parseInt(inputMonth, 10)
      || date.getDate() !== parseInt(inputDay, 10)
    ) {
      throw new BadRequest('La fecha de estreno no es una fecha válida');
    }
  });

const isRatingValid = body('rating')
  .notEmpty()
  .withMessage('La calificación es requerida')
  .isInt({ min: 0, max: 5 })
  .withMessage('La calificación debe ser un número entero entre 0 y 5');

const isGenresIdValid = body('genresId')
  .isArray()
  .withMessage('Los géneros deben ser un array de Ids')
  .custom(async (genresId) => {
    const genres = await Promise.all(
      genresId.map((genreId) => genreServices.getGenreById(genreId)),
    );
    genres.forEach((genre, i) => {
      if (!genre) {
        throw new BadRequest(`No existe género con el Id ${genresId[i]}`);
      }
    });
  });

const isCharacterIdValid = param('characterId')
  .isInt({ min: 1 })
  .withMessage('El Id es inválido');

const isNameValid = body('name')
  .ltrim()
  .rtrim()
  .notEmpty()
  .withMessage('El nombre es requerido')
  .isLength({ max: 64 })
  .withMessage('El nombre no puede tener más de 64 caracteres')
  .custom(async (name, { req }) => {
    const { method } = req;
    const character = await characterServices.getCharacterByName(name);
    if (method === 'POST' && character) {
      throw new BadRequest(`Ya existe un personaje con el nombre ${name}`);
    }
    const { characterId } = req.params;
    if (
      method === 'PUT'
      && character
      && character.characterId !== parseInt(characterId, 10)
    ) {
      throw new BadRequest(`Ya existe un personaje con el nombre ${name}`);
    }
  });

const isAgeValid = body('age')
  .optional()
  .isInt({ min: 0 })
  .withMessage('La edad es inválida');

const isWeightValid = body('weight')
  .optional()
  .isInt({ min: 0 })
  .withMessage('El peso es inválido');

const isStoryValid = body('story')
  .optional()
  .isLength({ max: 1000 })
  .withMessage('La historio na puede tener más de 256 caracteres');

const isMoviesIdValid = body('moviesId')
  .isArray()
  .withMessage('Las películas o series deben ser un array de Ids')
  .custom(async (moviesId) => {
    const movies = await Promise.all(
      moviesId.map((movieId) => movieServices.getMovieDetail(movieId)),
    );
    movies.forEach((movie, i) => {
      if (!movie) {
        throw new BadRequest(
          `No existe película o serie con el Id ${moviesId[i]}`,
        );
      }
    });
  });

module.exports = {
  isEmailValid,
  isPasswordValid,
  isMovieIdValid,
  isImageUrlValid,
  isTitleValid,
  isReleaseDateValid,
  isRatingValid,
  isGenresIdValid,
  isCharacterIdValid,
  isNameValid,
  isAgeValid,
  isWeightValid,
  isStoryValid,
  isMoviesIdValid,
};
