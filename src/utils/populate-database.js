const { Genre } = require('../models');

const populateDataBase = async () => {
  const genresCount = await Genre.count();
  if (!genresCount) {
    await Genre.bulkCreate([
      {
        genreId: 1,
        name: 'Action',
        imageUrl:
          'https://m.media-amazon.com/images/G/01/IMDb/genres/Action._CB1513316166_SX233_CR0,0,233,131_AL_.jpg',
      },
      {
        genreId: 2,
        name: 'Adventure',
        imageUrl:
          'https://m.media-amazon.com/images/G/01/IMDb/genres/Adventure._CB1513316166_SX233_CR0,0,233,131_AL_.jpg',
      },
      {
        genreId: 3,
        name: 'Animation',
        imageUrl:
          'https://m.media-amazon.com/images/G/01/IMDb/genres/Animation._CB1513316167_SX233_CR0,0,233,131_AL_.jpg',
      },
      {
        genreId: 4,
        name: 'Biography',
        imageUrl: null,
      },
      {
        genreId: 5,
        name: 'Comedy',
        imageUrl:
          'https://m.media-amazon.com/images/G/01/IMDb/genres/Comedy._CB1513316167_SX233_CR0,0,233,131_AL_.jpg',
      },
      {
        genreId: 6,
        name: 'Crime',
        imageUrl:
          'https://m.media-amazon.com/images/G/01/IMDb/genres/Crime._CB1513316167_SX233_CR0,0,233,131_AL_.jpg',
      },
      {
        genreId: 7,
        name: 'Documentary',
        imageUrl: null,
      },
      {
        genreId: 8,
        name: 'Drama',
        imageUrl:
          'https://m.media-amazon.com/images/G/01/IMDb/genres/Drama._CB1513316168_SX233_CR0,0,233,131_AL_.jpg',
      },
      {
        genreId: 9,
        name: 'Family',
        imageUrl: null,
      },
      {
        genreId: 10,
        name: 'Fantasy',
        imageUrl:
          'https://m.media-amazon.com/images/G/01/IMDb/genres/Fantasy._CB1513316168_SX233_CR0,0,233,131_AL_.jpg',
      },
      {
        genreId: 11,
        name: 'Film Noir',
        imageUrl: null,
      },
      {
        genreId: 12,
        name: 'History',
        imageUrl: null,
      },
      {
        genreId: 13,
        name: 'Horror',
        imageUrl:
          'https://m.media-amazon.com/images/G/01/IMDb/genres/Horror._CB1513316168_SX233_CR0,0,233,131_AL_.jpg',
      },
      {
        genreId: 14,
        name: 'Music',
        imageUrl: null,
      },
      {
        genreId: 15,
        name: 'Musical',
        imageUrl: null,
      },
      {
        genreId: 16,
        name: 'Mystery',
        imageUrl:
          'https://m.media-amazon.com/images/G/01/IMDb/genres/Mystery._CB1513316168_SX233_CR0,0,233,131_AL_.jpg',
      },
      {
        genreId: 17,
        name: 'Romance',
        imageUrl:
          'https://m.media-amazon.com/images/G/01/IMDb/genres/Romance._CB1513316168_SX233_CR0,0,233,131_AL_.jpg',
      },
      {
        genreId: 18,
        name: 'Sci-Fi',
        imageUrl:
          'https://m.media-amazon.com/images/G/01/IMDb/genres/Sci-Fi._CB1513316168_SX233_CR0,0,233,131_AL_.jpg',
      },
      {
        genreId: 19,
        name: 'Short Film',
        imageUrl: null,
      },
      {
        genreId: 20,
        name: 'Sport',
        imageUrl: null,
      },
      {
        genreId: 21,
        name: 'Superhero',
        imageUrl:
          'https://m.media-amazon.com/images/G/01/IMDb/genres/Superhero._CB1513316168_SX233_CR0,0,233,131_AL_.jpg',
      },
      {
        genreId: 22,
        name: 'Thriller',
        imageUrl:
          'https://m.media-amazon.com/images/G/01/IMDb/genres/Thriller._CB1513316169_SX233_CR0,0,233,131_AL_.jpg',
      },
      {
        genreId: 23,
        name: 'War',
        imageUrl: null,
      },
      {
        genreId: 24,
        name: 'Western',
        imageUrl: null,
      },
    ]);
  }
};

module.exports = populateDataBase;
