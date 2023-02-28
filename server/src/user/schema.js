import { Schema, model } from 'mongoose';

export const User = model(
  'User',
  new Schema(
    {
      nickName: String,
      email: String,
      password: String,
      birthday: String,
      gender: String,
      avatarFileName: String,
    },
    {
      versionKey: false,
    }
  )
);
