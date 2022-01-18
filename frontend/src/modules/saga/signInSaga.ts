import { call, takeLatest, put } from '@redux-saga/core/effects';
import { SignInActions } from '../signIn';
import UserService from '../../lib/api/userService';

const userService = new UserService();

const saveUserData = ({
  userData,
  token,
}: {
  userData: string;
  token: string;
}) => {
  localStorage.setItem('userData', userData);
  localStorage.setItem('token', token);
};

function* signInFetchSaga({
  payload,
}: ReturnType<typeof SignInActions.signInFetch>) {
  try {
    const {
      userDto: { email, address, crewLeader, crewName, id, nickName },
      token,
    } = yield call(userService.login, payload);
    const data = {
      email,
      address,
      crewLeader,
      crewName,
      id,
      nickName,
    };
    yield put(SignInActions.signInSuccess(data));
    yield put(SignInActions.setToken(token));
    yield call(saveUserData, { userData: JSON.stringify(data), token });
  } catch (error: any | Error) {
    console.error(error);
    yield put(
      SignInActions.signInFailure({ code: '500', message: error.message })
    );
  }
}

export default function* watchSignIn() {
  yield takeLatest('signIn/signInFetch', signInFetchSaga);
}
