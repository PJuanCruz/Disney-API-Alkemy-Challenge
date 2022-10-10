/* eslint-disable */
const chai = require('chai');
const { sequelize } = require('../src/models');
const server = require('../src/server/express');
const populateDataBase = require('../src/utils/populate-database');

chai.should();

chai.use(require('chai-http'));
chai.use(require('chai-uuid'));

let token;

describe('Auth', () => {
  before(async () => {
    await sequelize.sync({ force: true });
    await populateDataBase();
  });

  describe('POST /auth/register', () => {
    it('Debe registrar un nuevo usuario si los campos son válidos', (done) => {
      chai
        .request(server)
        .post('/auth/register')
        .send({
          email: 'example@email.com',
          password: 'examplePassword1!',
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('userId').to.be.a.uuid('v4');
          response.body.should.have.property('email').eq('example@email.com');
        });

      chai
        .request(server)
        .post('/auth/register')
        .send({
          email: 'example2@email.com',
          password: 'examplePassword2!',
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('userId').to.be.a.uuid('v4');
          response.body.should.have.property('email').eq('example2@email.com');
        });

      done();
    });
    it('No debe registrar un nuevo usuario si el email ya está siendo utilizado', (done) => {
      chai
        .request(server)
        .post('/auth/register')
        .send({
          email: 'example@email.com',
          password: 'examplePassword1!',
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.should.have.property('message').to.be.a('string');
          response.body.should.have.property('error').eq(true);
        });

      chai
        .request(server)
        .post('/auth/register')
        .send({
          email: 'example2@email.com',
          password: 'newExamplePassword2!',
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.should.have.property('message').to.be.a('string');
          response.body.should.have.property('error').eq(true);
        });

      done();
    });
    it('No debe registrar un nuevo usuario si los campos son inválidos', (done) => {
      chai
        .request(server)
        .post('/auth/register')
        .send({
          email: 'exampleEmailCom',
          password: 'examplePassword1!',
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.should.have.property('message').to.be.a('string');
          response.body.should.have.property('error').eq(true);
        });

      chai
        .request(server)
        .post('/auth/register')
        .send({
          email: 'example3@email.com',
          password: 'examplepassword',
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.should.have.property('message').to.be.a('string');
          response.body.should.have.property('error').eq(true);
        });

      done();
    });
  });

  describe('POST /auth/login', () => {
    it('Debe loguear y responder con un token si los campos son correctos', (done) => {
      chai
        .request(server)
        .post('/auth/login')
        .send({
          email: 'example@email.com',
          password: 'examplePassword1!',
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property('token').to.be.a('string');
          token = response.body.token;
        });

      chai
        .request(server)
        .post('/auth/login')
        .send({
          email: 'example2@email.com',
          password: 'examplePassword2!',
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property('token').to.be.a('string');
        });

      done();
    });
    it('No debe loguear si los campos son incorrectos', (done) => {
      chai
        .request(server)
        .post('/auth/login')
        .send({
          email: 'example@email.com',
          password: 'wrongPassword!1',
        })
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.not.have.property('token');
        });

      chai
        .request(server)
        .post('/auth/login')
        .send({})
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.not.have.property('token');
        });

      done();
    });
  });
});

describe('Genres', () => {
  describe('GET /genres', () => {
    it('No debe responder con la lista de géneros si no se envía un token válido', (done) => {
      chai
        .request(server)
        .get('/genres')
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.be.a('object');
          response.body.should.have.property('message').to.be.a('string');
          response.body.should.have.property('error').eq(true);
        });

      chai
        .request(server)
        .get('/genres')
        .set('Authorization', `Bearer wrongToken`)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          response.body.should.have.property('message').to.be.a('string');
          response.body.should.have.property('error').eq(true);
        });

      done();
    });
    it('Debe responder con la lista de géneros si se envía un token válido', (done) => {
      chai
        .request(server)
        .get('/genres')
        .set('Authorization', `Bearer ${token}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
        });

      done();
    });
  });
});

describe('Movies', () => {
  describe('POST /movies', () => {
    it('Debe crear una nueva película si los campos y el token son válidos', (done) => {
      chai
        .request(server)
        .post('/movies')
        .set('Authorization', `Bearer ${token}`)
        .send({
          imageUrl:
            'https://static.wikia.nocookie.net/doblaje/images/6/69/Lilo-and-stitch.jpg/revision/latest?cb=20161221220904&path-prefix=es',
          title: 'Lilo & Stitch',
          releaseDate: '2002-06-16',
          rating: 4,
          genresId: [2, 3, 5, 8, 9, 10, 18],
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.not.property('error');
          response.body.should.have.property('movieId').to.be.a('number');
          response.body.should.have
            .property('imageUrl')
            .eq(
              'https://static.wikia.nocookie.net/doblaje/images/6/69/Lilo-and-stitch.jpg/revision/latest?cb=20161221220904&path-prefix=es',
            );
          response.body.should.have.property('title').eq('Lilo & Stitch');
          response.body.should.have.property('releaseDate').eq('2002-06-16');
          response.body.should.have.property('rating').eq(4);
          response.body.should.have.property('characters');
          response.body.should.have.property('genres').length(7);
        });

      done();
    });
  });
  describe('GET /movies', () => {
    it('Debe responder con la lista de películas y series', (done) => {
      chai
        .request(server)
        .get('/movies')
        .set('Authorization', `Bearer ${token}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
        });

      done();
    });
  });
  describe('GET /movies/:movieId', () => {
    it('Debe responder con el detalle de la película o serie', (done) => {
      chai
        .request(server)
        .get('/movies/1')
        .set('Authorization', `Bearer ${token}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
        });

      done();
    });
  });
  describe('PUT /movies/:movieId', () => {
    it('Debe actualizar la película si los campos y el token son válidos', (done) => {
      chai
        .request(server)
        .put('/movies/1')
        .set('Authorization', `Bearer ${token}`)
        .send({
          imageUrl:
            'https://static.wikia.nocookie.net/doblaje/images/6/69/Lilo-and-stitch.jpg/revision/latest?cb=20161221220904&path-prefix=es',
          title: 'Lilo & Stitch',
          releaseDate: '2002-06-17',
          rating: 3,
          genresId: [2, 3, 5],
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.not.property('error');
          response.body.should.have.property('movieId').eq(1);
          response.body.should.have
            .property('imageUrl')
            .eq(
              'https://static.wikia.nocookie.net/doblaje/images/6/69/Lilo-and-stitch.jpg/revision/latest?cb=20161221220904&path-prefix=es',
            );
          response.body.should.have.property('title').eq('Lilo & Stitch');
          response.body.should.have.property('releaseDate').eq('2002-06-17');
          response.body.should.have.property('rating').eq(3);
          response.body.should.have.property('characters');
          response.body.should.have.property('genres').length(3);
        });

      done();
    });
  });
});

describe('Characters', () => {
  describe('POST /characters', () => {
    it('Debe crear un nuevo personaje si los campos y el token son válidos', (done) => {
      chai
        .request(server)
        .post('/characters')
        .set('Authorization', `Bearer ${token}`)
        .send({
          imageUrl:
            'https://th.bing.com/th/id/OIP.pNC5nW4OPyuT4Y2rT73DDAHaEK?pid=ImgDet&rs=1',
          name: 'Stitch',
          age: 1,
          // weight: null,
          story:
            'Originalmente creado para provocar el caos en toda la galaxia fue una amalgama de varias razas alienígenas con el fin de crear el arma definitiva, que se caracteriza por su mal genio y el comportamiento malicioso, rasgos que lo llevaron a mofarse y escapar heroicamente de la guardia galáctica que lo confiaría al exilio en un asteroide errante. Termina llegando a la Tierra y es arrollado por conductores que lo confunden con alguna extraña variedad de perro es llevado a la perrera donde la que sería su mejor amiga Lilo, lo adopta como su cachorro.',
          moviesId: [1],
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.not.property('error');
          response.body.should.have.property('characterId');
          response.body.should.have.property('imageUrl');
          response.body.should.have.property('name');
          response.body.should.have.property('age');
          response.body.should.have.property('weight');
          response.body.should.have.property('story');
          response.body.should.have.property('movies');
        });

      done();
    });
  });
  describe('GET /characters', () => {
    it('Debe responder con la lista de personajes', (done) => {
      chai
        .request(server)
        .get('/characters')
        .set('Authorization', `Bearer ${token}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
        });

      done();
    });
  });
  describe('GET /characters/:characterId', () => {
    it('Debe responder con el detalle del personaje', (done) => {
      chai
        .request(server)
        .get('/characters/1')
        .set('Authorization', `Bearer ${token}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
        });

      done();
    });
  });
  describe('PUT /characters', () => {
    it('Debe actualizar el personaje si los campos y el token son válidos', (done) => {
      chai
        .request(server)
        .put('/characters/1')
        .set('Authorization', `Bearer ${token}`)
        .send({
          imageUrl:
            'https://th.bing.com/th/id/OIP.pNC5nW4OPyuT4Y2rT73DDAHaEK?pid=ImgDet&rs=1',
          name: 'Stitch',
          age: 5,
          weight: 10,
          story:
            'Originalmente creado para provocar el caos en toda la galaxia fue una amalgama de varias razas alienígenas con el fin de crear el arma definitiva, que se caracteriza por su mal genio y el comportamiento malicioso, rasgos que lo llevaron a mofarse y escapar heroicamente de la guardia galáctica que lo confiaría al exilio en un asteroide errante. Termina llegando a la Tierra y es arrollado por conductores que lo confunden con alguna extraña variedad de perro es llevado a la perrera donde la que sería su mejor amiga Lilo, lo adopta como su cachorro.',
          moviesId: [1],
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.not.property('error');
          response.body.should.have.property('characterId').eq(1);
          response.body.should.have.property('imageUrl');
          response.body.should.have.property('name');
          response.body.should.have.property('age').eq(5);
          response.body.should.have.property('weight').eq(10);
          response.body.should.have.property('story');
          response.body.should.have.property('movies').length(1);
        });

      done();
    });
  });
});
