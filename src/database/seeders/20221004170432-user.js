/** @type {import('sequelize-cli').Migration} */
const hash = require('../../utils/hash');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          user_id: '140891d7-7aa3-4ff9-b7b4-d592875188d3',
          email: 'user@email.com',
          password: hash('password'),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
