import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import addRoutes from './utils/apiRoutes.js';
import { API_PORT, AUTH0_BASE_URL } from '../config/index.js';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: AUTH0_BASE_URL }));

addRoutes(app);

if (process.env.NODE_ENV == 'test') {
  module.exports = app;
} else {
  const server = app.listen(API_PORT, () => console.log(`API Server listening on port ${API_PORT}`));
  process.on('SIGINT', () => server.close());
}
