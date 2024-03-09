// src/controllers/transactionController.js
const Transaction = require('../models/Transaction');
const { Op } = require('sequelize');
const Joi = require('joi');

// Joi schema for transaction input validation
const transactionSchema = Joi.object({
  description: Joi.string().required(),
  amount: Joi.number().required(),
  type: Joi.string().valid('income', 'expense').required(),
});

// Add a new transaction
exports.addTransaction = async (req, res) => {
  try {
    // Validate and sanitize input data
    const { error, value } = transactionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Sanitize data to prevent SQL injection
    const sanitizedTransaction = {
      description: value.description,
      amount: parseFloat(value.amount),
      type: value.type,
    };

    // Assuming you have user information stored in req.user after authentication
    const userId = req.user.id;

    const transaction = await Transaction.create({
      ...sanitizedTransaction,
      userId,
    });

    return res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Retrieve transactions for a given period
exports.getTransactions = async (req, res) => {
  try {
    // Assuming you have user information stored in req.user after authentication
    const userId = req.user.id;

    const transactions = await Transaction.findAll({
      where: {
        userId,
        createdAt: {
          [Op.between]: [req.query.startDate, req.query.endDate],
        },
      },
    });

    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Retrieve a summary of transactions
exports.getTransactionSummary = async (req, res) => {
  try {
    // Assuming you have user information stored in req.user after authentication
    const userId = req.user.id;

    const summary = await Transaction.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.literal('CASE WHEN "type" = \'income\' THEN "amount" ELSE 0 END')), 'totalIncome'],
        [sequelize.fn('SUM', sequelize.literal('CASE WHEN "type" = \'expense\' THEN "amount" ELSE 0 END')), 'totalExpense'],
      ],
      where: {
        userId,
        createdAt: {
          [Op.between]: [req.query.startDate, req.query.endDate],
        },
      },
    });

    return res.status(200).json(summary);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a specific transaction
exports.deleteTransaction = async (req, res) => {
  try {
    // Assuming you have user information stored in req.user after authentication
    const userId = req.user.id;

    const transaction = await Transaction.findOne({
      where: {
        id: req.params.id,
        userId,
      },
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    await transaction.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
