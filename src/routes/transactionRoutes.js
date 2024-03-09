// src/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authenticateUser = require('../middlewares/authenticateUser');

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
 *       500:
 *         description: Internal Server Error
 */
router.post('/', authenticateUser, transactionController.addTransaction);

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
 *       500:
 *         description: Internal Server Error
 */
router.get('/', authenticateUser, transactionController.getTransactions);

/**
 * @swagger
 * /transactions/summary:
 *   get:
 *     summary: Retrieve a summary of transactions for a given period
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
 *         description: Successfully retrieved transaction summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalIncome:
 *                   type: number
 *                   description: Total income for the period
 *                 totalExpense:
 *                   type: number
 *                   description: Total expense for the period
 *               required:
 *                 - totalIncome
 *                 - totalExpense
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/summary', authenticateUser, transactionController.getTransactionSummary);

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a specific transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the transaction to delete
 *     responses:
 *       204:
 *         description: Successfully deleted the transaction
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', authenticateUser, transactionController.deleteTransaction);

module.exports = router;
