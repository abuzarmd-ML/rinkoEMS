// Import Sequelize and connection
import {  DataTypes } from  'sequelize';
import {sequelize}  from '../config/database.js';

// Define User model
const User = sequelize.define('User', {
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('Super Admin', 'Admin', 'Employee'),
    defaultValue: 'Employee'
  }
});

// Export User model
export { User }
