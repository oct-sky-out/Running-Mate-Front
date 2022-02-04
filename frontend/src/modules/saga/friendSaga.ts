import { call, takeLeading, put } from '@redux-saga/core/effects';
import { friendActions } from '../friend';
import FriendService from '../../lib/api/friendService';

function* friendSaga({
  payload: { requestRole, requesteeName, token, refreshFriendApi },
}: ReturnType<typeof friendActions.requestFriend>) {
  try {
    const friendService = new FriendService();

    if (requestRole === 'request') {
      yield call(friendService.requestFriend, token, requesteeName);
      yield call(friendService.getUserByUserRelation, token, requesteeName);
    }

    if (requestRole === 'permit')
      yield call(friendService.permitFriendRequst, token, requesteeName);

    if (requestRole === 'dismiss')
      yield call(friendService.dismissFriendRequst, token, requesteeName);

    yield call(refreshFriendApi);
    yield put(friendActions.successRequestFriend());
  } catch {
    yield put(friendActions.failureRequestFriend());
  }
}

export default function* watchFriend() {
  yield takeLeading('friend/requestFriend', friendSaga);
}
