import 'dotenv/config';
import express from 'express';
import { setupSwagger } from './lib/swagger.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

app.use('/', authRoutes);

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
