import HttpError from '../error-handler/http-error';
import { Request, Response, NextFunction } from 'express';

// General error handler
export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(`${error.name}: ${error.message}`);

  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ error: error.message });
  } else {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
