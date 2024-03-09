// src/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authenticateUser = require('../middlewares/authenticateUser');

router.post('/', authenticateUser, transactionController.addTransaction);
router.get('/', authenticateUser, transactionController.getTransactions);
router.get('/summary', authenticateUser, transactionController.getTransactionSummary);
router.delete('/:id', authenticateUser, transactionController.deleteTransaction);

module.exports = router;
