import { Router } from 'express';

import userController from './controller.js';
import userValidation from './validation.js';

const router = new Router();

router.post('/', userValidation.create, userController.create);
router.post('/login', userValidation.login, userController.login);
router.patch('/', userValidation.update, userController.update);
router.get('/', userController.getAll);
router.get(
  '/avatar/:avatar',
  userValidation.getAvatar,
  userController.getAvatar
);

export default router;
