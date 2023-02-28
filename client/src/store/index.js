import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { userSlice } from './slice';

const rootReducer = combineReducers({
  userReduser: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['user/setAvatar'],
        ignoredActionPaths: ['payload', 'meta.arg'],
        ignoredPaths: ['userReduser.user.avatar', 'userReduser.error'],
      },
    }),
});
