import { Router } from 'express';
import GetServerInfo from '../controllers/server-info/get';
import { validateSchema } from '../middlewares/schema.validator';
import { gameUpdateSchema } from '../controllers/server-info/dtos/game-update-schema';
export const serverRouter = Router();

serverRouter.get('/server-info', GetServerInfo);
serverRouter.post(
  '/server-info',
  validateSchema(gameUpdateSchema),
  GetServerInfo
);
