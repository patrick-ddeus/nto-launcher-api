import { Router } from 'express';
import GetServerInfo from '../controllers/server-info/get';
import PostServerInfo from '../controllers/server-info/post';
import { validateSchema } from '../middlewares/schema.validator';
import { gameUpdateSchema } from '../controllers/server-info/dtos/game-update-schema';
import { tokenValidator } from '../middlewares/token.validator';
export const serverRouter = Router();

serverRouter.get('/server-info', GetServerInfo);
serverRouter.post(
  '/server-info',
  tokenValidator,
  validateSchema(gameUpdateSchema),
  PostServerInfo
);
