/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Genres_Movies',
      [
        {
          movie_id: 1,
          genre_id: 2,
        },
        {
          movie_id: 1,
          genre_id: 3,
        },
        {
          movie_id: 1,
          genre_id: 5,
        },
        {
          movie_id: 1,
          genre_id: 8,
        },
        {
          movie_id: 1,
          genre_id: 9,
        },
        {
          movie_id: 1,
          genre_id: 10,
        },
        {
          movie_id: 1,
          genre_id: 18,
        },
        {
          movie_id: 2,
          genre_id: 3,
        },
        {
          movie_id: 2,
          genre_id: 5,
        },
        {
          movie_id: 2,
          genre_id: 8,
        },
        {
          movie_id: 2,
          genre_id: 9,
        },
        {
          movie_id: 2,
          genre_id: 18,
        },
        {
          movie_id: 3,
          genre_id: 2,
        },
        {
          movie_id: 3,
          genre_id: 5,
        },
        {
          movie_id: 3,
          genre_id: 8,
        },
        {
          movie_id: 3,
          genre_id: 9,
        },
        {
          movie_id: 3,
          genre_id: 17,
        },
        {
          movie_id: 4,
          genre_id: 2,
        },
        {
          movie_id: 4,
          genre_id: 3,
        },
        {
          movie_id: 4,
          genre_id: 5,
        },
        {
          movie_id: 4,
          genre_id: 8,
        },
        {
          movie_id: 4,
          genre_id: 9,
        },
        {
          movie_id: 4,
          genre_id: 15,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Genres_Movies', null, {});
  },
};
