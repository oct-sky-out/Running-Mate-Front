import { all } from '@redux-saga/core/effects';
import watchSignIn from './signInSaga';
import watchSignUp from './signUpSaga';
import watchCreateCrew from './createCrewSaga';
import watchDeleteCrew from './deleteCrewSaga';
import watchSignUpRequestCrew from './signUpRequestCrewSaga';

export default function* rootSaga() {
  yield all([
    watchSignUp(),
    watchSignIn(),
    watchCreateCrew(),
    watchDeleteCrew(),
    watchSignUpRequestCrew(),
  ]);
}
