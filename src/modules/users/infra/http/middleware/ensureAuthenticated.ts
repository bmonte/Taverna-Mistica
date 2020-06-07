import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: string;
  exp: string;
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('Token JWT is missing!', 401);

  const [, token] = authHeader.split(' ');
  const secret = process.env.APP_SECRET;

  if (!secret) throw new AppError('JWT Secret is missing!', 401);

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token!', 401);
  }
}

export default ensureAuthenticated;
