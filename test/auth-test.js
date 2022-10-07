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
  describe('POST /auth/register', () => {
    it('Debe crear un nuevo usuario si los campos son válidos', (done) => {
      const body = {
        email: 'example@email.com',
        password: 'examplePassword1!',
      };
      chai
        .request(server)
        .post('/auth/register')
        .send(body)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('userId').to.be.a.uuid('v4');
          response.body.should.have.property('email').eq(body.email);
          done();
        });
    });
    it('No debe crear un nuevo usuario si los campos son inválidos', (done) => {
      const body = {
        email: 'email',
        password: 'password',
      };
      chai
        .request(server)
        .post('/auth/register')
        .send(body)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.should.have.property('message').to.be.a('string');
          response.body.should.have.property('error').eq(true);
          done();
        });
    });
    it('No debe crear un nuevo usuario si el email ya está registrado', (done) => {
      const body = {
        email: 'example@email.com',
        password: 'examplePassword1!',
      };
      chai
        .request(server)
        .post('/auth/register')
        .send(body)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.should.have.property('message').to.be.a('string');
          response.body.should.have.property('error').eq(true);
          done();
        });
    });
  });
  describe('POST /auth/login', () => {
    it('Debe obtener un token si los campos son correctos', (done) => {
      const body = {
        email: 'example@email.com',
        password: 'examplePassword1!',
      };
      chai
        .request(server)
        .post('/auth/login')
        .send(body)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property('token').to.be.a('string');
          token = response.body.token;
          done();
        });
    });
    it('No debe obtener un token si los campos son incorrectos', (done) => {
      const body = {
        email: 'example@email.com',
        password: 'wrongpass',
      };
      chai
        .request(server)
        .post('/auth/login')
        .send(body)
        .end((err, response) => {
          console.log(token);
          response.should.have.status(401);
          done();
        });
    });
  });
});
