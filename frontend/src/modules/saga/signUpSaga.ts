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
    console.log(sendData);
    const { data } = await axios.post('/join', sendData);
    console.log(data);
    return;
  } catch (err: any) {
    throw new Error('error-code-101');
  }
};

function* signUpFetchSaga({
  payload,
}: ReturnType<typeof SignUpActions.signUpFetch>) {
  try {
    const { nickname } = yield call(signUp, payload);
    yield put(SignUpActions.signUpFetchSuccess(nickname));
  } catch (error: any) {
    console.error(error);
    yield put(SignUpActions.signUpFetchError(error.message));
  }
}

export default function* watchSignUp() {
  yield takeLatest('signUp/signUpFetch', signUpFetchSaga);
}
