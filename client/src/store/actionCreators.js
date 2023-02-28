import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { SERVER_URL } from '../util/constants';

export const createUser = createAsyncThunk(
  'user/create',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(SERVER_URL, user);
      return {
        _id: response.data._id,
        avatarFileName: response.data.avatarFileName,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (identifier, thunkAPI) => {
    try {
      const response = await axios.post(`${SERVER_URL}/login`, identifier);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (updatingObject, thunkAPI) => {
    try {
      const response = await axios.patch(SERVER_URL, updatingObject);
      return response.data.avatarFileName;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
