export const userReducer = {
  setNickName(state, action) {
    state.user.nickName = action.payload;
  },

  setEmail(state, action) {
    state.user.email = action.payload;
  },

  setPassword(state, action) {
    state.user.password = action.payload;
  },

  setCheckPassword(state, action) {
    state.user.checkPassword = action.payload;
  },

  setBirthday(state, action) {
    state.user.birthday = action.payload;
  },

  setGender(state, action) {
    state.user.gender = action.payload;
  },

  setAvatar(state, action) {
    state.user.avatar = action.payload;
  },
};

export const userFetchReduser = {};
