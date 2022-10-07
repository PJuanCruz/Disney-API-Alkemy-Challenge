/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Genres',
      [
        {
          genre_id: 1,
          name: 'Action',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 2,
          name: 'Adventure',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 3,
          name: 'Animation',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 4,
          name: 'Biography',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 5,
          name: 'Comedy',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 6,
          name: 'Crime',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 7,
          name: 'Documentary',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 8,
          name: 'Drama',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 9,
          name: 'Family',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 10,
          name: 'Fantasy',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 11,
          name: 'Film Noir',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 12,
          name: 'History',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 13,
          name: 'Horror',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 14,
          name: 'Music',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 15,
          name: 'Musical',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 16,
          name: 'Mystery',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 17,
          name: 'Romance',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 18,
          name: 'Sci-Fi',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 19,
          name: 'Short Film',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 20,
          name: 'Sport',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 21,
          name: 'Superhero',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 22,
          name: 'Thriller',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 23,
          name: 'War',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
        {
          genre_id: 24,
          name: 'Western',
          image_url: 'https://th.bing.com/th/id/OIP.-PzPlFKUTmPFdinD94LasAHaFj?pid=ImgDet&rs=1',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Genres', null, {});
  },
};
