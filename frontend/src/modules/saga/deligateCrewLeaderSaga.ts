import { call, takeLatest, put } from '@redux-saga/core/effects';
import { SignInActions } from '../signIn';
import { crewActions } from '../crew';
import CrewService from '../../lib/api/crewService';
import { refreshUserDataAndRefreshLocalStorage } from './createCrewSaga';

function* deligateCrewLeaderSaga({
  payload,
}: ReturnType<typeof crewActions.deligateCrewLeader>) {
  try {
    const { message } = yield call(
      new CrewService().delegateCrewLeader,
      payload.memberNickName,
      payload.token
    );
    if (message === '위임 완료') {
      yield put(crewActions.sucessCrewRequest());
      const { email, crewName, nickName, address, id, crewLeader } = yield call(
        refreshUserDataAndRefreshLocalStorage,
        payload.token
      );
      yield put(
        SignInActions.signInSuccess({
          email,
          crewName,
          nickName,
          address,
          id,
          crewLeader,
        })
      );
    }
  } catch {
    yield put(crewActions.failureCrewRequest());
  }
}

export default function* watchDeligateCrewLeader() {
  yield takeLatest('crew/deligateCrewLeader', deligateCrewLeaderSaga);
}
