import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export const tokenValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization'];

  if (!token || token !== `Bearer ${process.env.API_KEY}`) {
    res.status(401).json({
      statusCode: httpStatus.UNAUTHORIZED,
      error: "Unauthorized",
    });
    return;
  }

  next();
};
