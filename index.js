require('dotenv').config();
const app = require('./src/server/express');
const { sequelize } = require('./src/models');
const populateDataBase = require('./src/utils/populate-database');

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: false });
    console.log('All models were synchronized successfully.');
    await populateDataBase();
    app.listen(PORT, console.log(`Listening on ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
