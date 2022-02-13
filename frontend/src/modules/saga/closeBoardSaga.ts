import { call, takeLeading, put } from '@redux-saga/core/effects';
import { noticeActions } from '../notice';
import NoticeService from '../../lib/api/noticeService';

function* closeBoardSaga({
  payload,
}: ReturnType<typeof noticeActions.setClosed>) {
  try {
    yield call(
      new NoticeService().setNoticeClosed,
      payload.boardId,
      payload.token
    );

    yield put(noticeActions.setSuccessNoticeFetchStatus());
  } catch {
    yield put(noticeActions.setFailureNoticeFetchStatus());
  }
}

export default function* watchCloseBoard() {
  yield takeLeading('board/setClosed', closeBoardSaga);
}
