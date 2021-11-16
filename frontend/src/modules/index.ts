import { combineReducers } from '@reduxjs/toolkit';
import {
  useSelector as reduxUseSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import signUpReducer from './signUp';

const rootReducer = combineReducers({
  signUp: signUpReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;

export default rootReducer;
