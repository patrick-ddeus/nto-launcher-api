import { Router } from 'express';
import { serverRouter } from './server-info';

export const indexRouter = Router();

indexRouter.use(serverRouter);
