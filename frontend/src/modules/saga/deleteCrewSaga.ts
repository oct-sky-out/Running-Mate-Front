import { call, takeLatest, put } from '@redux-saga/core/effects';
import { SignInActions } from '../signIn';
import { crewActions } from '../crew';
import CrewService from '../../lib/api/crewService';
import { refreshUserDataAndRefreshLocalStorage } from './createCrewSaga';

function* deleteCrewSaga({
  payload,
}: ReturnType<typeof crewActions.deleteCrew>) {
  const { message } = yield call(
    new CrewService().deleteCrew,
    payload.crewName
  );
  if (message === '삭제 완료') {
    yield put(crewActions.sucessCrewRequest());
    const { email, crewName, nickName, address, id, crewLeader, reuslt } =
      yield call(
        refreshUserDataAndRefreshLocalStorage,
        payload.token,
        payload.userNickName
      );
    if (reuslt === undefined)
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
  if (message === '이미 크루가 존재합니다.')
    yield put(crewActions.failureCrewRequest());
}

export default function* watchDeleteCrew() {
  yield takeLatest('crew/deleteCrew', deleteCrewSaga);
}
