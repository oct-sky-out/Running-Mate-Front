import { call, put, takeLeading } from '@redux-saga/core/effects';
import CrewService from '../../lib/api/crewService';
import { crewActions } from '../crew';

function* permitCrewRequsetSaga({
  payload,
}: ReturnType<typeof crewActions.permitCrewRequst>) {
  try {
    const crewService = new CrewService();
    yield call(crewService.permitRequstUser, payload.userNickName);
    yield put(crewActions.sucessCrewRequest());
    const {
      id,
      crewLeaderId,
      crewRegion,
      openChat,
      crewName,
      explanation,
      userDtos,
      requestUsers,
      crewRequested,
    } = yield call(crewService.getCrewDetail, payload.crewName);
    yield put(
      crewActions.setCrewDetail({
        id,
        crewLeaderId,
        crewRegion,
        openChat,
        crewName,
        explanation,
        userDtos,
        requestUsers,
        crewRequested,
      })
    );
  } catch {
    yield put(crewActions.failureCrewRequest());
  }
}

export default function* watchPermitCrewRequest() {
  yield takeLeading('crew/permitCrewRequst', permitCrewRequsetSaga);
}
