import 'reflect-metadata';
import 'express-async-errors';
import dotenv from 'dotenv';

import { errors } from 'celebrate';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import routes from './router';

import '../typeorm';
import '@shared/container';

dotenv.config();

const app = express();

app.use(helmet());

app.use(express.json());
app.use('/files', express.static(uploadConfig.tmpFolder));
app.use(routes);

app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
