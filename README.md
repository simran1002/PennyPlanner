# PennyPlanner Project

PennyPlanner is a personal finance management application. The API will allow users to track their incomes, expenses, and provide insights on their spending habits. The primary focus is on backend development, with an emphasis on security, data integrity, and efficient data retrieval.

## Table of Contents

1. [Setting Up the Project](#1-setting-up-the-project)
   - [Dependencies](#dependencies)
   - [Project Structure](#project-structure)
2. [API Endpoints](#2-api-endpoints)
   - [POST /transactions](#post-transactions)
   - [GET /transactions](#get-transactions)
   - [GET /transactions/summary](#get-transactionssummary)
   - [DELETE /transactions/:id](#delete-transactionsid)
3. [Data Validation and Sanitization](#3-data-validation-and-sanitization)
4. [Authentication and Authorization](#4-authentication-and-authorization)
5. [Database Design](#5-database-design)
   - [Relational Database Schema](#relational-database-schema)
   - [ER Diagram](#er-diagram)
   - [SQL Definitions](#sql-definitions)
6. [Efficient Data Retrieval](#6-efficient-data-retrieval)
7. [Security Measures](#7-security-measures)
8. [Testing](#8-testing)
9. [Documentation](#9-documentation)
10. [Bonus](#12-bonus)

## 1. Setting Up the Project:

### Dependencies:

- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **PostgreSQL**: Database.

### Project Structure:

Organize your project into the following folders:

- **src**: Source code.
- **tests**: Unit tests.
- **docs**: Documentation.

Create an `index.js` file as the entry point.

## 2. API Endpoints:

### POST /transactions:

- Add new transactions.
- Validate and sanitize input data.
- Authenticate and authorize the user.

### GET /transactions:

- Retrieve transactions for a given period.
- Authenticate and authorize the user.

### GET /transactions/summary:

- Retrieve a summary of transactions.
- Authenticate and authorize the user.

### DELETE /transactions/:id:

- Delete a specific transaction.
- Authenticate and authorize the user.

## 3. Data Validation and Sanitization:

- Use a validation library (e.g., Joi).
- Sanitize input data to prevent SQL injection and XSS attacks.

## 4. Authentication and Authorization:

- Implement JWT-based authentication.
- Use middleware for user-specific access.

## 5. Database Design:

### Relational Database Schema:

- Design tables for user accounts and transactions.

### ER Diagram:

- Illustrate relationships.

### SQL Definitions:

- Write SQL scripts for table creation.

## 6. Efficient Data Retrieval:

- Optimize queries for transaction summaries.
- Consider indexes or aggregation queries.

## 7. Security Measures:

- Implement rate limiting.
- Use encryption for data at rest.

## 8. Testing:

- Write unit tests for API endpoints.
- Focus on business logic, data layer, and security.

## 9. Documentation:

- Used Swagger for the documentation.
- Include endpoint descriptions and examples.

## 10. Bonus:

- Consider additional security measures like HTTPS, input validation, and output encoding.
