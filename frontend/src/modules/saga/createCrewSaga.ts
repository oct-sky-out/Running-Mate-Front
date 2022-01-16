import { call, takeLatest, put } from '@redux-saga/core/effects';
import { CreateCrewActions } from '../createCrew';
import CrewService from '../../lib/api/crewService';

function* createCrewFetchSaga({
  payload,
}: ReturnType<typeof CreateCrewActions.newCrew>) {
  const { resultMessage } = yield call(new CrewService().createCrew, {
    token: payload.token,
    createCrewData: payload.createCrewData,
  });
  if (resultMessage === '크루 생성 완료')
    yield put(CreateCrewActions.setCreateOpenChatStatus('Sucecss'));
  if (resultMessage === '이미 크루가 존재합니다.')
    yield put(CreateCrewActions.setCreateOpenChatStatus('Failure'));
}

export default function* watchCreateCrew() {
  yield takeLatest('createCrew/newCrew', createCrewFetchSaga);
}
