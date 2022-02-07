import { call, takeLatest, put } from '@redux-saga/core/effects';
import { SignInActions } from '../signIn';
import { crewActions } from '../crew';
import CrewService from '../../lib/api/crewService';
import { refreshUserDataAndRefreshLocalStorage } from './createCrewSaga';

function* leaveCrewSaga({ payload }: ReturnType<typeof crewActions.leaveCrew>) {
  try {
    const { message } = yield call(
      new CrewService().leaveCrew,
      payload.userNickName
    );
    if (message === '크루 탈퇴 완료') {
      yield put(crewActions.sucessCrewRequest());
      const { email, crewName, nickName, address, id, crewLeader } = yield call(
        refreshUserDataAndRefreshLocalStorage,
        payload.token,
        payload.userNickName
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

export default function* watchLeaveCrew() {
  yield takeLatest('crew/leaveCrew', leaveCrewSaga);
}
