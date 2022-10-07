class NotFound extends Error {
  constructor(message) {
    super(message || 'Not Found');
    this.status = 404;
  }
}

module.exports = NotFound;
