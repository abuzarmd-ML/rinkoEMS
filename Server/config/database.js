// Import Sequelize
// const { Sequelize } = require('sequelize');
import {Sequelize} from 'sequelize'
const sequelize = new Sequelize('employeems', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export { sequelize }
