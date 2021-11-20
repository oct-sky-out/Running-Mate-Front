import { call, takeLatest, put } from '@redux-saga/core/effects';
import { ISignUpForm } from '../types/signUpTypes';
import { SignUpActions } from '../signUp';

const signUp = async ({
  email,
  nickname,
  name,
  password,
  postCode,
  address,
  optionAddress,
}: ISignUpForm) => {
  try {
    return { nickname };
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
    yield put(SignUpActions.signUpFetchError(error.code));
  }
}

export default function* watchSignUp() {
  yield takeLatest('signUp/signUpFetch', signUpFetchSaga);
}
