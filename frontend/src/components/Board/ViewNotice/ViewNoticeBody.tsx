import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import dateParser from '../../../common/functions/dateParser';
import useSwalerts from '../../../common/hooks/useSwalerts';
import { useSelector } from '../../../modules';
import { noticeActions } from '../../../modules/notice';

interface IProps {
  boardId: string;
}
const ViewNoticeBody: React.FC<IProps> = ({ boardId }) => {
  const {
    address,
    closed,
    content,
    image,
    meetingTime,
    openChat,
    token,
    noticeFetchStatus,
  } = useSelector((state) => ({
    address: state.viewNotice.viewNoticeData.address,
    closed: state.viewNotice.viewNoticeData.closed,
    content: state.viewNotice.viewNoticeData.content,
    image: state.viewNotice.viewNoticeData.image,
    meetingTime: state.viewNotice.viewNoticeData.meetingTime,
    openChat: state.viewNotice.viewNoticeData.openChat,
    token: state.signIn.token,
    noticeFetchStatus: state.viewNotice.noticeFetchStatus,
  }));
  const dispatch = useDispatch();
  const { successToast, errorToast } = useSwalerts();

  const showMeetingTime = () => {
    const endDate = meetingTime ? new Date(meetingTime) : '';
    if (closed) return '마감됨';
    if (endDate) return dateParser(endDate);
    return '마감 기간 없음';
  };

  const setNoticeClosed = () =>
    dispatch(
      noticeActions.setClosed({
        closed: !closed,
        boardId,
        token,
      })
    );

  useEffect(() => {
    if (noticeFetchStatus === 'Success') {
      successToast(
        '게시물 마감상태 변경',
        `게시물 마감상태 변경이 완료되었습니다..`
      ).then(() => dispatch(noticeActions.setInitNoticeFetchStatus()));
    }
    if (noticeFetchStatus === 'Failure') {
      errorToast(
        '게시물 마감상태 변경 실패',
        '게시물 마감상태 변경에 실패하였습니다. 다시 시도해주세요.'
      ).then(() => dispatch(noticeActions.setInitNoticeFetchStatus()));
    }
  }, [noticeFetchStatus]);

  return (
    <div className="px-4 sm:px-0">
      <div className="grid grid-cols-1 gap-10 mb-20">
        <div className="flex justify-center mb-4 ">
          {image && <img src={image} alt="map" className="max:w-2/5" />}
        </div>
        <p
          className="w-full text-base md:text-xl break-words px-10"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <div className="w-full space-y-3 relative">
        <div>
          <span className="block font-bold text-xl">장소</span>
          <span className="w-full break-words">{`${address.dou} ${address.si} ${address.gu}`}</span>
        </div>
        <div>
          <span className="block font-bold text-xl">마감 시간</span>
          <span className="w-full break-words">{showMeetingTime()}</span>
        </div>
        <div>
          <span className="block font-bold text-xl">오픈 채팅방 링크</span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="w-full break-words"
            href="https://open.kakao.com/o/gI8chtEddssfsd"
          >
            {openChat}
          </a>
        </div>
        <div className="w-full text-right">
          <button
            className="text-white w-28 h-10 md:w-32 md:w-25 rounded-xl hover:opacity-80 transition ease-in-out delay-100 ml-4 mb-2 outline-none bg-indigo-400 cursor-pointer"
            onClick={setNoticeClosed}
          >
            {closed ? '공지 마감' : '마감 취소'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewNoticeBody;
