const NotFound = require('../errors/not-found');

const notFound = (req, res, next) => {
  const error = new NotFound();
  next(error);
};

module.exports = notFound;
