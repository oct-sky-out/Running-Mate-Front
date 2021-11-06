import { combineReducers } from '@reduxjs/toolkit';
import {
  useSelector as reduxUseSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import counterReducer from './counter';

const rootReducer = combineReducers({ counter: counterReducer });

export type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;

export default rootReducer;
