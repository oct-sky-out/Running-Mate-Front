import { call, takeLatest, put } from '@redux-saga/core/effects';
import { SignInActions } from '../signIn';
import UserService from '../../lib/api/userService';

const userService = new UserService();

const deleteLocalUserDataAndToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
};

function* logOutFetchSaga({
  payload,
}: ReturnType<typeof SignInActions.logOut>) {
  try {
    yield call(userService.logOut, payload);
    yield call(deleteLocalUserDataAndToken);
    yield put(SignInActions.logOutSuccess());
    yield put(SignInActions.setInit());
  } catch (error: any | Error) {
    yield put(SignInActions.logOutFailure());
  }
}

export default function* watchLogOut() {
  yield takeLatest('signIn/logOut', logOutFetchSaga);
}
