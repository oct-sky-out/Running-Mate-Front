import { all } from '@redux-saga/core/effects';
import watchSignIn from './signInSaga';
import watchSignUp from './signUpSaga';
import watchCreateCrew from './createCrewSaga';

export default function* rootSaga() {
  yield all([watchSignUp(), watchSignIn(), watchCreateCrew()]);
}
