import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {authReducer} from './auth/reducer';

const reducers = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof reducers>;

export const store = configureStore({
  reducer: reducers,
});
