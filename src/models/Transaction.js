// src/models/Transaction.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Transaction = sequelize.define('Transaction', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Transaction;
