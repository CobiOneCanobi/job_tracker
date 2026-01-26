import 'dotenv/config';
import express from 'express';

const app = express();

app.get('/', (_req, res) => res.send('hello world'));

const PORT = process.env.PORT ?? '3000';
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log(`Express app listening on port ${PORT}!`);
});
