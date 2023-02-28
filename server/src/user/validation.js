import { body, cookie, param, query } from 'express-validator';

import {
  NOT_EXISTS,
  NOT_STRING,
  NOT_EXISTS_OR_EMPTY,
  NOT_EMAIL,
  EMPTY,
} from '../util/constants.js';

class UserValidation {
  constructor() {
    this.create = [
      body('nickName')
        .exists({ checkFalsy: true })
        .withMessage(NOT_EXISTS_OR_EMPTY)
        .isString()
        .withMessage(NOT_STRING),
      body('email')
        .exists({ checkFalsy: true })
        .withMessage(NOT_EXISTS_OR_EMPTY)
        .isEmail()
        .withMessage(NOT_EMAIL),
      body('password')
        .exists({ checkFalsy: true })
        .withMessage(NOT_EXISTS_OR_EMPTY)
        .isString()
        .withMessage(NOT_STRING),
    ];

    this.login = [
      body('email')
        .exists({ checkFalsy: true })
        .withMessage(NOT_EXISTS_OR_EMPTY)
        .isEmail()
        .withMessage(NOT_EMAIL),
      body('password')
        .exists({ checkFalsy: true })
        .withMessage(NOT_EXISTS_OR_EMPTY)
        .isString()
        .withMessage(NOT_STRING),
    ];

    this.update = [
      body('_id')
        .exists({ checkFalsy: true })
        .withMessage(NOT_EXISTS_OR_EMPTY)
        .isString()
        .withMessage(NOT_STRING),
      body('nickName')
        .optional()
        .notEmpty()
        .withMessage(EMPTY)
        .isString()
        .withMessage(NOT_STRING),
      body('password')
        .optional()
        .notEmpty()
        .withMessage(EMPTY)
        .isString()
        .withMessage(NOT_STRING),
    ];

    this.getAvatar = [param('avatar').exists().withMessage(NOT_EXISTS)];
  }
}

export default new UserValidation();
