import { call, takeLatest, put } from '@redux-saga/core/effects';
import { ISignInForm } from '../types/signInTypes';
import { SignInActions } from '../signIn';
import axios from '../../lib/api/axios';

const signIn = async (signInData: ISignInForm) => {
  try {
    const { data } = await axios.post('/login', signInData);
    return { ...data };
  } catch (err: any) {
    throw new Error('아이디 또는 비밀번호를 다시 확인해주세요.');
  }
};

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
    } = yield call(signIn, payload);
    const data = {
      email,
      address,
      crewLeader,
      crewName,
      crewId: id,
      nickname: nickName,
    };
    yield put(SignInActions.signInSuccess(data));
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
