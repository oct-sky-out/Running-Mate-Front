import { call, takeLatest, put } from '@redux-saga/core/effects';
import { CreateCrewActions } from '../createCrew';
import CrewService from '../../lib/api/crewService';
import UserService from '../../lib/api/userService';
import { SignInActions } from '../signIn';
import { IUserData } from '../types/signInTypes';

export const refreshUserDataAndRefreshLocalStorage = async (
  token: string
): Promise<IUserData> => {
  try {
    const userData = await new UserService().myPage(token);
    localStorage.setItem('userData', JSON.stringify(userData));
    return userData;
  } catch (err: Error | any) {
    throw Error('정보 불러오기 실패');
  }
};

function* createCrewFetchSaga({
  payload,
}: ReturnType<typeof CreateCrewActions.newCrew>) {
  try {
    const { message } = yield call(new CrewService().createCrew, {
      token: payload.token,
      createCrewData: payload.createCrewData,
    });
    if (typeof message === 'number') {
      yield put(CreateCrewActions.setCreateCrewStatus('Sucecss'));
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
    yield put(CreateCrewActions.setCreateCrewStatus('Failure'));
  }
}

export default function* watchCreateCrew() {
  yield takeLatest('createCrew/newCrew', createCrewFetchSaga);
}
