// tests/transactionController.test.js
const chai = require('chai');
const supertest = require('supertest');
const app = require('../src/index');
const Transaction = require('../src/models/Transaction');
const User = require('../src/models/User');

const expect = chai.expect;

describe('Transaction Controller', () => {
  beforeEach(async () => {
    // Set up any necessary test data or mocks
    // For example, you may want to create a test user
    await User.create({
      username: 'testuser',
      password: 'testpassword',
    });
  });

  afterEach(async () => {
    // Clean up test data or mocks
    await Transaction.destroy({ where: {} });
    await User.destroy({ where: {} });
  });

  describe('POST /transactions', () => {
    it('should add a new transaction', async () => {
      const response = await supertest(app)
        .post('/transactions')
        .send({
          description: 'Test Transaction',
          amount: 100,
          type: 'income',
        })
        .expect(201);

      expect(response.body).to.have.property('id');
      expect(response.body.description).to.equal('Test Transaction');
    });
  });

  describe('GET /transactions', () => {
    it('should retrieve transactions for a given period', async () => {
      // Assuming you have a test transaction in the database
      await Transaction.create({
        description: 'Test Transaction',
        amount: 100,
        type: 'income',
        userId: 1, // Assuming the user ID of the test user
      });

      const response = await supertest(app)
        .get('/transactions')
        .query({ startDate: '2022-01-01', endDate: '2022-12-31' })
        .expect(200);

      expect(response.body).to.be.an('array');
      expect(response.body.length).to.equal(1);
      expect(response.body[0].description).to.equal('Test Transaction');
    });
  });

  describe('GET /transactions/summary', () => {
    it('should retrieve a summary of transactions for a given period', async () => {
      // Assuming you have a test transaction in the database
      await Transaction.create({
        description: 'Test Income',
        amount: 200,
        type: 'income',
        userId: 1,
      });

      await Transaction.create({
        description: 'Test Expense',
        amount: 50,
        type: 'expense',
        userId: 1,
      });

      const response = await supertest(app)
        .get('/transactions/summary')
        .query({ startDate: '2022-01-01', endDate: '2022-12-31' })
        .expect(200);

      expect(response.body).to.have.property('totalIncome');
      expect(response.body).to.have.property('totalExpense');
      expect(response.body.totalIncome).to.equal(200);
      expect(response.body.totalExpense).to.equal(50);
    });
  });

  describe('DELETE /transactions/:id', () => {
    it('should delete a specific transaction', async () => {
      // Assuming you have a test transaction in the database
      const testTransaction = await Transaction.create({
        description: 'Test Transaction to Delete',
        amount: 150,
        type: 'expense',
        userId: 1,
      });

      await supertest(app)
        .delete(`/transactions/${testTransaction.id}`)
        .expect(204);

      const deletedTransaction = await Transaction.findByPk(testTransaction.id);
      expect(deletedTransaction).to.be.null;
    });
  });
});
