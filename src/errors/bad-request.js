class BadRequest extends Error {
  constructor(message) {
    super(message || 'Bad Request');
    this.status = 400;
  }
}

module.exports = BadRequest;
