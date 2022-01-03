import { call, takeLatest, put } from '@redux-saga/core/effects';
import { ISignInForm } from '../types/signInTypes';
import { SignInActions } from '../signIn';
import axios from '../../lib/api/axios';

const signIn = async (signInData: ISignInForm) => {
  try {
    const { data } = await axios.post('/login', signInData);
    console.log(data);
  } catch (err: any) {
    throw new Error('error-code-101');
  }
};

function* signInFetchSaga({
  payload,
}: ReturnType<typeof SignInActions.signInFetch>) {
  try {
    const { email } = yield call(signIn, payload);
    yield put(
      SignInActions.signInSuccess({
        email,
        address: '서울 강남구',
        nickname: '귀여미',
        crew: '',
        isCrewLeader: false,
        crewId: '',
      })
    );
  } catch (error: any | Error) {
    console.error(error);
    yield put(
      SignInActions.signInFailure({ code: '404', message: error.code })
    );
  }
}

export default function* watchSignIn() {
  yield takeLatest('signIn/signInFetch', signInFetchSaga);
}
