import { all } from '@redux-saga/core/effects';
import watchSignUp from './signUpSaga';

export default function* rootSaga() {
  yield all([watchSignUp()]);
}
