/* eslint-disable */
const chai = require('chai');
const { sequelize } = require('../src/models');
const server = require('../src/server/express');

chai.should();

chai.use(require('chai-http'));
chai.use(require('chai-uuid'));

describe('Auth', () => {
  let token;
  before(async () => {
    await sequelize.sync({ force: true });
  });
  describe('GET /character', () => {
    it('Debe crear un nuevo usuario si los campos son válidos', (done) => {
      console.log('######', token);
      chai
        .request(server)
        .get('/character')
        .set('Authorization', 'Bearer ' + token)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
});
