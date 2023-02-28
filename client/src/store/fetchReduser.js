import { createUser, loginUser, updateUser } from './actionCreators';

export const userFetchReduser = {
  [createUser.fulfilled.type]: (state, action) => {
    state.isLoading = false;
    state.error = '';
    state.user._id = action.payload._id;
    state.user.avatarFileName = action.payload.avatarFileName;
    state.user.avatar = null;
    state.user.password = '';
    state.user.checkPassword = '';
  },
  [createUser.pending.type]: (state) => {
    state.isLoading = true;
  },
  [createUser.rejected.type]: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  /* ********************************************** */
  [loginUser.fulfilled.type]: (state, action) => {
    state.isLoading = false;
    state.error = '';
    for (let key in action.payload) {
      state.user[key] = action.payload[key];
    }
    state.user.password = '';
  },
  [loginUser.pending.type]: (state) => {
    state.isLoading = true;
  },
  [loginUser.rejected.type]: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  /* ********************************************** */
  [updateUser.fulfilled.type]: (state, action) => {
    state.isLoading = false;
    state.error = '';
    state.user.avatarFileName = action.payload;
    state.user.avatar = null;
    state.user.password = '';
    state.user.checkPassword = '';
  },
  [updateUser.pending.type]: (state) => {
    state.isLoading = true;
  },
  [updateUser.rejected.type]: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
};
