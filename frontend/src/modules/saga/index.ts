// @ts-ignore
import { all } from 'redux-saga/effects';
import watchSignUp from './signUpSaga';

export default function* rootSaga() {
  yield all([watchSignUp()]);
}
