/* eslint-disable no-unused-vars */

const errorHandler = (error, req, res, next) => {
  console.error(error);
  const status = error.status || 500;
  const message = error.message || error;

  return res.status(status).json({ message, error: true });
};

module.exports = errorHandler;
