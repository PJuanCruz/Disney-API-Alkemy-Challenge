/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Characters_Movies',
      [
        {
          character_id: 1,
          movie_id: 4,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Characters_Movies', null, {});
  },
};
