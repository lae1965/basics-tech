import { createSlice } from '@reduxjs/toolkit';
import { userReducer } from './reduser';
import { userFetchReduser } from './fetchReduser';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      _id: '',
      nickName: '',
      email: '',
      password: '',
      checkPassword: '',
      birthday: new Date().toISOString().split('T')[0],
      gender: 'not',
      avatar: null,
      avatarFileName: '',
    },
    isLoading: false,
    error: '',
  },
  reducers: userReducer,
  extraReducers: userFetchReduser,
});

export const {
  setNickName,
  setEmail,
  setPassword,
  setCheckPassword,
  setBirthday,
  setGender,
  setAvatar,
} = userSlice.actions;
