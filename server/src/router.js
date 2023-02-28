import { Router } from 'express';
import userRouter from './user/router.js';

export const router = new Router();

router.use('/user', userRouter);
