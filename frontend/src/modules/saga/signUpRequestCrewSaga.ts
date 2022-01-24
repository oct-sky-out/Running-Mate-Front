import { call, put, takeLatest } from '@redux-saga/core/effects';
import CrewService from '../../lib/api/crewService';
import { crewActions } from '../crew';

function* signUpRequestCrewSaga({
  payload,
}: ReturnType<typeof crewActions.signUpRequestCrew>) {
  try {
    yield call(new CrewService().signUpCrew, payload.token, payload.crewName);
    yield put(crewActions.sucessCrewRequest());
    yield put(crewActions.setCrewRequested(true));
  } catch {
    yield put(crewActions.failureCrewRequest());
    yield put(crewActions.setCrewRequested(false));
  }
}

export default function* watchSignUpRequestCrew() {
  yield takeLatest('crew/signUpRequestCrew', signUpRequestCrewSaga);
}
