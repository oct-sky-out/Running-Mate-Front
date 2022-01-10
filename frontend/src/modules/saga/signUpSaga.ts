import { call, takeLatest, put } from '@redux-saga/core/effects';
import { SignUpActions } from '../signUp';
import UserService from '../../lib/api/userService';

const userService = new UserService();

function* signUpFetchSaga({
  payload,
}: ReturnType<typeof SignUpActions.signUpFetch>) {
  try {
    const { userId } = yield call(userService.signUp, payload);
    yield put(SignUpActions.signUpFetchSuccess(userId));
  } catch (error: any) {
    console.error(error);
    yield put(SignUpActions.signUpFetchError(error.message));
  }
}

export default function* watchSignUp() {
  yield takeLatest('signUp/signUpFetch', signUpFetchSaga);
}
