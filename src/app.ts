import 'dotenv/config';
import express from 'express';
import { setupSwagger } from './lib/swagger.js';

const app = express();

app.use(express.json());

setupSwagger(app);

/**
 * @openapi
 * /:
 *   get:
 *     summary: Health check
 *     description: Returns a simple hello world message
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: hello world
 */
app.get('/', (_req, res) => res.send('hello world'));

const PORT = process.env.PORT ?? '3000';
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log(`Express app listening on port ${PORT}!`);
  // eslint-disable-next-line no-console
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
