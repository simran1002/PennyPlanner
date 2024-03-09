const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authenticateUser = require('../middlewares/authenticateUser');
const Joi = require('joi');
const he = require('he');

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API endpoints for managing transactions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           description: The description of the transaction
 *         amount:
 *           type: number
 *           description: The amount of the transaction
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           description: The type of the transaction (income or expense)
 *       required:
 *         - description
 *         - amount
 *         - type
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Add a new transaction (income or expense)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Successfully added a new transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: 'Validation error: "description" is required'
 */
router.post('/', authenticateUser, (req, res) => {
  // Validate and sanitize input data
  const { error } = validateTransaction(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Use encoded data to prevent XSS attacks
  const sanitizedDescription = he.encode(req.body.description);

  // Handle the valid input
  // Call the controller function, passing sanitizedDescription and other validated data
  const result = transactionController.addTransaction({
    description: sanitizedDescription,
    amount: req.body.amount,
    type: req.body.type,
    // Add other data as needed
  });

  // Return the result or appropriate response
  res.status(201).json(result);
});

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Retrieve a list of transactions for a given period
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Start date of the period
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: End date of the period
 *     responses:
 *       200:
 *         description: Successfully retrieved transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: 'Validation error: "startDate" must be a valid date'
 */
router.get('/', authenticateUser, (req, res) => {
  // Validate input parameters
  const { error } = validatePeriod(req.query.startDate, req.query.endDate);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Handle the valid input
  // Call the controller function, passing startDate and endDate
  const result = transactionController.getTransactions({
    startDate: req.query.startDate,
    endDate: req.query.endDate,
    // Add other parameters as needed
  });

  // Return the result or appropriate response
  res.status(200).json(result);
});

// Add similar annotations and routes for other endpoints

module.exports = router;

// Validation functions
function validateTransaction(transaction) {
  const schema = Joi.object({
    description: Joi.string().required(),
    amount: Joi.number().required(),
    type: Joi.string().valid('income', 'expense').required(),
  });
  return schema.validate(transaction);
}

function validatePeriod(startDate, endDate) {
  const schema = Joi.object({
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
  });
  return schema.validate({ startDate, endDate });
}
