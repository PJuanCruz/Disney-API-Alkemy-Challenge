/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Characters',
      [
        {
          character_id: 1,
          image_url:
            'https://phantom-marca.unidadeditorial.es/14ec6c3a4de08d20dbf05d520f57b24a/resize/1320/f/jpg/assets/multimedia/imagenes/2022/10/02/16647205789448.jpg',
          name: 'Tarzan',
          age: 31,
          weight: null,
          story:
            'Tarzan is an extremely brave, loyal, and honorable character. He cares deeply about his family and friends and was willing to risk his life to save them.',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Characters', null, {});
  },
};
