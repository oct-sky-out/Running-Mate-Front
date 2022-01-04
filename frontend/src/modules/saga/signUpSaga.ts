import { call, takeLatest, put } from '@redux-saga/core/effects';
import { ISignUpForm } from '../types/signUpTypes';
import { SignUpActions } from '../signUp';
import axios from '../../lib/api/axios';

const signUp = async (signUpForm: ISignUpForm) => {
  try {
    const sendData = {
      email: signUpForm.email,
      password: signUpForm.password,
      nickName: signUpForm.nickname,
      address: signUpForm.address,
    };
    const { data } = await axios.post<number>('/join', sendData);

    return { userId: data };
  } catch (err: any) {
    throw new Error('서버오류로 인해 회원가입 실패하였습니다.');
  }
};

function* signUpFetchSaga({
  payload,
}: ReturnType<typeof SignUpActions.signUpFetch>) {
  try {
    const { userId } = yield call(signUp, payload);
    yield put(SignUpActions.signUpFetchSuccess(userId));
  } catch (error: any) {
    console.error(error);
    yield put(SignUpActions.signUpFetchError(error.message));
  }
}

export default function* watchSignUp() {
  yield takeLatest('signUp/signUpFetch', signUpFetchSaga);
}
