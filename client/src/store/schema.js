import { DATE, EMAIL, GENDER, NICK_NAME, PASSWORD } from '../util/constants';
import {
  getBirthday,
  getCheckPassword,
  getEmail,
  getGender,
  getNickName,
  getPassword,
} from './selectors';

import {
  setNickName,
  setEmail,
  setPassword,
  setCheckPassword,
  setBirthday,
  setGender,
} from './slice';

export const schema = {
  nickName: {
    dispatcher: setNickName,
    selector: getNickName,
    regularExp: NICK_NAME,
  },
  email: {
    dispatcher: setEmail,
    selector: getEmail,
    regularExp: EMAIL,
  },
  password: {
    dispatcher: setPassword,
    selector: getPassword,
    regularExp: PASSWORD,
  },
  checkPassword: {
    dispatcher: setCheckPassword,
    selector: getCheckPassword,
    regularExp: PASSWORD,
  },
  birthday: {
    dispatcher: setBirthday,
    selector: getBirthday,
    regularExp: DATE,
  },
  gender: {
    dispatcher: setGender,
    selector: getGender,
    regularExp: GENDER,
  },
};
