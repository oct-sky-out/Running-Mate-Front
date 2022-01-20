import React from 'react';
import {
  useHistory,
  withRouter,
  RouteComponentProps,
  Link,
} from 'react-router-dom';
import Notice from '../../excuteData/NoticeMock/NoticeMock';
import DetailBaseBorder from '../../common/components/DetailBaseBorder';
import dateParser from '../../common/functions/dateParser';
import PreviousPageButton from '../../common/components/PreviousPageButton';
import { GetNoticesType } from '../../modules/types/notice';
import { useSelector } from '../../modules/index';
import { ReactComponent as Logo } from '../../assets/logo_mini.svg';

interface MatchParam {
  noticeId: string;
}

const ViewNotice: React.FC<RouteComponentProps<MatchParam>> = ({ match }) => {
  //* History
  const history = useHistory();

  const noticeMockData = Notice;
  const { noticeId } = match.params;

  const {
    address,
    closed,
    content,
    count,
    id,
    image,
    meetingTime,
    openChat,
    regDate,
    title,
    author,
  } = useSelector((state) => ({
    address: state.viewNotice.viewNoticeData.address,
    closed: state.viewNotice.viewNoticeData.closed,
    content: state.viewNotice.viewNoticeData.content,
    count: state.viewNotice.viewNoticeData.count,
    id: state.viewNotice.viewNoticeData.id,
    image: state.viewNotice.viewNoticeData.image,
    meetingTime: state.viewNotice.viewNoticeData.meetingTime,
    openChat: state.viewNotice.viewNoticeData.openChat,
    regDate: state.viewNotice.viewNoticeData.regDate,
    title: state.viewNotice.viewNoticeData.title,
    author: state.viewNotice.viewNoticeData.author,
  }));

  const endDate = new Date(Number(meetingTime));

  return (
    <DetailBaseBorder>
      <PreviousPageButton
        text="뒤로가기"
        className="w-24 md:w-32 lg:w-40 py-4 flex justify-start items-start"
        iconSizeClassName="text-2xl md:text-3xl lg:text-4xl"
        tailwindTextSize="text-sm md:text-2xl"
        data-cy="back"
        onClick={() => {
          history.goBack();
        }}
      />
      <div className="flex flex-col mb-20 pb-5 border-b-2">
        <h1 className="text-xl md:text-4xl mb-10 font-bold">{title}</h1>
        <div className="flex items-center justify-between mb-4">
          <div className="w-32 flex justify-around items-center cursor-pointer">
            <Logo
              width="80"
              height="80"
              className="cursor-pointer w-10 lg:w-24 md:w-14"
            />
            <span>
              <Link to={`/userInfo/${author}`}>{author}</Link>
            </span>
          </div>
          <span className="align-bottom mr-3">{regDate}</span>
        </div>
        <div className="text-right mr-4">
          <button type="button" className="cursor-pointer">
            수정
          </button>
          <span>/</span>
          <button type="button" className="cursor-pointer">
            삭제
          </button>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 gap-10 mb-20">
          <div className="flex justify-center">
            {image && <img src={image} alt="map" className="w-2/5" />}
          </div>
          <p className="w-full text-base md:text-2xl break-words">{content}</p>
        </div>
        <div className="w-full space-y-3">
          <div>
            <span className="block font-bold text-xl">장소</span>
            <span className="w-full break-words">{`${address.dou} ${address.si} ${address.gu}`}</span>
          </div>
          <div>
            <span className="block font-bold text-xl">시간</span>
            <span className="w-full break-words">{dateParser(endDate)}</span>
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
        </div>
      </div>
    </DetailBaseBorder>
  );
};

export default withRouter(ViewNotice);
