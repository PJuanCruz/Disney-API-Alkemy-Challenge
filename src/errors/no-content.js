class NoContent extends Error {
  constructor(message) {
    super(message || 'No Content');
    this.status = 204;
  }
}

module.exports = NoContent;
