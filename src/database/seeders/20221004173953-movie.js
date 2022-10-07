/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Movies',
      [
        {
          movie_id: 1,
          image_url: 'https://static.wikia.nocookie.net/doblaje/images/6/69/Lilo-and-stitch.jpg/revision/latest?cb=20161221220904&path-prefix=es',
          title: 'Lilo & Stitch',
          release_date: '16-06-2002',
          rating: 4,
        },
        {
          movie_id: 2,
          image_url: 'https://upload.wikimedia.org/wikipedia/en/b/b5/Liloandstitch2dvd.jpg',
          title: 'Lilo & Stitch 2: Stitch Has a Glitch',
          release_date: '15-08-2005',
          rating: 3,
        },
        {
          movie_id: 3,
          image_url: 'https://static.wikia.nocookie.net/doblaje/images/3/34/The_Parent_Trap_1998.jpg/revision/latest?cb=20200727011628&path-prefix=es',
          title: 'The Parent Trap',
          release_date: '20-07-1998',
          rating: 3,
        },
        {
          movie_id: 4,
          image_url: 'https://th.bing.com/th/id/R.287e0d42f263fbbbdd2ce5c9d8c256de?rik=DPF3u%2fJukl8QNg&pid=ImgRaw&r=0',
          title: 'Tarzan',
          release_date: '12-06-1999',
          rating: 4,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Movies', null, {});
  },
};
