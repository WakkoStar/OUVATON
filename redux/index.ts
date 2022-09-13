import {configureStore} from '@reduxjs/toolkit';
import configReducer from './config';
import filterReducer from './filter';

const store = configureStore({
  reducer: {
    filter: filterReducer,
    config: configReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
