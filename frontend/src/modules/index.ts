import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  useSelector as reduxUseSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import signUpReducer from './signUp';
import signInReducer from './signIn';
import createCrewReducer from './createCrew';
import newPasswordReducer from './newPassword';
import createNoticeReducer from './createNotice';

const rootReducer = combineReducers({
  signUp: signUpReducer,
  signIn: signInReducer,
  createCrew: createCrewReducer,
  newPassword: newPasswordReducer,
  createNotice: createNoticeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;

const sagaMiddleware = createSagaMiddleware();

export const store = () => {
  const initStroe = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    devTools: true,
  });

  sagaMiddleware.run(rootSaga);
  return initStroe;
};

export const useMockStore = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

export default rootReducer;
