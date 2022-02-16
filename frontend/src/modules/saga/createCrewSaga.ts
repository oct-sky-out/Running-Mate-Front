import { call, takeLatest, put } from '@redux-saga/core/effects';
import { CreateCrewActions } from '../createCrew';
import CrewService from '../../lib/api/crewService';
import UserService from '../../lib/api/userService';
import { SignInActions } from '../signIn';
import { IUserData } from '../types/signInTypes';

export const refreshUserDataAndRefreshLocalStorage = async (
  token: string,
  userNickName: string
): Promise<IUserData | { result: false }> => {
  try {
    const userData = await new UserService().getUser(userNickName, token);
    localStorage.setItem('userData', JSON.stringify(userData));
    return userData;
  } catch {
    return { result: false };
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
    if (message === '크루 생성 완료') {
      yield put(CreateCrewActions.setCreateCrewStatus('Sucecss'));
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
      yield put(CreateCrewActions.setCreateCrewStatus('Failure'));
  } catch {
    yield put(CreateCrewActions.setCreateCrewStatus('Failure'));
  }
}

export default function* watchCreateCrew() {
  yield takeLatest('createCrew/newCrew', createCrewFetchSaga);
}
