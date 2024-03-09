// src/models/User.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('./db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      // Use bcrypt to hash the password before saving it to the database
      const hashedPassword = bcrypt.hashSync(value, 10);
      this.setDataValue('password', hashedPassword);
    },
  },
});

module.exports = User;
