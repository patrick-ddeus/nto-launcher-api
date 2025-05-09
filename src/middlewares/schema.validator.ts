import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ObjectSchema } from 'joi';

export function validateSchema<T>(schema: ObjectSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json(errors);
      return;
    }
    return next();
  };
}