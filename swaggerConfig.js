// swaggerConfig.js
module.exports = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Personal Finance API',
        version: '1.0.0',
        description: 'API for tracking incomes and expenses',
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT',
        },
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
    },
    apis: ['src/routes/*.js'], // Specify the path to your route files
  };
  