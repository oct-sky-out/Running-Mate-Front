import { call, takeLatest, put } from '@redux-saga/core/effects';
import { ISignInForm } from '../types/signInTypes';
import { SignInActions } from '../signIn';

const signIn = async ({ email, password }: ISignInForm) => {
  try {
    return { email, password };
  } catch (err: any) {
    throw new Error('error-code-101');
  }
};

function* signInFetchSaga({
  payload,
}: ReturnType<typeof SignInActions.signInFetch>) {
  try {
    const { email } = yield call(signIn, payload);
    yield put(SignInActions.signInSuccess({ userEmail: email }));
  } catch (error: any | Error) {
    console.error(error);
    yield put(
      SignInActions.signInFailure({ code: '404', message: error.code })
    );
  }
}

export default function* watchSignUp() {
  yield takeLatest('signUp/signInFetch', signInFetchSaga);
}
