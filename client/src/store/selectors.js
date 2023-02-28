export const getNickName = (state) => state.userReduser.user.nickName;
export const getEmail = (state) => state.userReduser.user.email;
export const getPassword = (state) => state.userReduser.user.password;
export const getCheckPassword = (state) => state.userReduser.user.checkPassword;
export const getBirthday = (state) => state.userReduser.user.birthday;
export const getGender = (state) => state.userReduser.user.gender;
export const getAvatar = (state) => state.userReduser.user.avatar;
export const getAvatarFileName = (state) =>
  state.userReduser.user.avatarFileName;
export const getId = (state) => state.userReduser.user._id;
