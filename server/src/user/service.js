import mongoose from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

import { User } from './schema.js';
import { imageExtensions } from '../util/constants.js';
import { ApiError } from '../errors/apiError.js';

class UserService {
  async create(user, files) {
    try {
      const res = await User.findOne({ email: user.email }).exec();
      if (res) {
        throw ApiError.UnAuthorization(
          `Пользователь с email ${user.email} уже существует.`
        );
      }
      user.password = await bcrypt.hash(user.password, 3);
      user.avatarFileName = this.uploadAvatar(files);
      const result = await User.create(user);
      return { _id: result._id, avatarFileName: user.avatarFileName };
    } catch (e) {
      throw e;
    }
  }

  async login(identifier) {
    try {
      const user = await User.findOne({ email: identifier.email }).exec();
      if (!user) {
        throw ApiError.UnAuthorization(
          `Пользователя с email ${identifier.email} не существует.`
        );
      }
      const isEqual = await bcrypt.compare(identifier.password, user.password);
      if (!isEqual) {
        throw ApiError.UnAuthorization('Неправильный пароль');
      }
      user.password = '';
      return user;
    } catch (e) {
      throw e;
    }
  }

  async update(updatingObject, files) {
    try {
      const user = await User.findById(updatingObject._id).exec();
      if (!user) {
        throw ApiError.NotFound(
          `Пользователь с id ${updatingObject._id} отсутствует в базе`
        );
      }
      if (files?.avatar) {
        if (user.avatarFileName)
          fs.rmSync(path.join(process.cwd(), 'public', user.avatarFileName));
        user.avatarFileName = this.uploadAvatar(files);
      }
      if ('nickName' in updatingObject) user.nickName = updatingObject.nickName;
      if ('password' in updatingObject)
        user.password = await bcrypt.hash(updatingObject.password, 3);
      const result = await user.save();
      return { avatarFileName: result.avatarFileName };
    } catch (e) {
      throw e;
    }
  }

  async getAll() {
    try {
      return await User.find().exec();
    } catch (e) {
      throw e;
    }
  }

  async getAvatar(avatarFileName) {
    try {
      if (!avatarFileName) {
        throw ApiError.BadRequest('У этого пользователя аватар отсутствует');
      }
      const stream = fs.createReadStream(
        path.join(process.cwd(), 'public', avatarFileName)
      );
      if (!stream) {
        throw ApiError.NotFound('Аватар отсутствует в базе');
      }
      return stream;
    } catch (e) {
      throw e;
    }
  }

  uploadAvatar(files) {
    try {
      if (!files?.avatar) return '';
      const file = files.avatar;
      const extension = path.extname(file.name);
      if (!imageExtensions.includes(extension)) {
        throw ApiError.BadRequest(
          'Формат файла не соответствует формату фотографии'
        );
      }
      const hashName = uuidV4() + extension;
      fs.writeFileSync(path.join(process.cwd(), 'public', hashName), file.data);
      return hashName;
    } catch (e) {
      throw e;
    }
  }
}

export default new UserService();
