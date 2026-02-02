import 'dotenv/config';
import { env } from './config/env.js';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { setupSwagger } from './lib/swagger.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

app.get('/', (_req : Request, res : Response) : void => {
  res.redirect('/api-docs');
})
app.use('/', authRoutes);

app.use((err : Error, _req : Request, res : Response, _next : NextFunction) : void => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = env.port;
app.listen(PORT, () : void => {
  // eslint-disable-next-line no-console
  console.log(`Express app listening on port ${PORT}!`);
  // eslint-disable-next-line no-console
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
