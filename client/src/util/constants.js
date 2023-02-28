export const NICK_NAME = /^.{3,40}$/;
export const EMAIL = /^([a-z0-9_\\.-]+)@([a-z0-9_\\.-]+)\.([a-z\\.]{2,6})$/;
export const PASSWORD = /^.{8,25}$/;
export const DATE = /^.+$/;
export const GENDER = /^(fe)?(male)$/;

export const REQUEST_STATUS = {
  IGLE: 0,
  PENDING: 1,
  SUCCESS: 2,
  FAILURE: 3,
};

export const SERVER_URL = 'http://localhost:3333/api/user';
