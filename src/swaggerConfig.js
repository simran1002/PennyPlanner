// src/swaggerConfig.js
module.exports = {
    // ... (previous swagger configuration)
  
    components: {
      schemas: {
        Transaction: {
          type: 'object',
          properties: {
            description: { type: 'string' },
            amount: { type: 'number' },
            type: { type: 'string', enum: ['income', 'expense'] },
            // Add other properties as needed
          },
          required: ['description', 'amount', 'type'],
        },
      },
    },
  };
  