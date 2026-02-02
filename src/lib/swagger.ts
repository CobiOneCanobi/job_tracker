import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import type { Express } from 'express';
import { env } from '../config/env.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Tracker API',
      version: '1.0.0',
      description: 'Job Tracker API documentation',
    },
    servers: [
      {
        url: env.nodeEnv === 'production'
          ? 'https://job-tracker.onrender.com'
          : 'http://localhost:3000',
        description: env.nodeEnv === 'production'
          ? 'Production server'
          : 'Development server',
      },
    ],
  },
  apis: env.nodeEnv === 'production'
    ? ['./dist/src/**/*.js']
    : ['./src/**/*.ts'], // Path to files with API documentation
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
