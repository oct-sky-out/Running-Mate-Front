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

interface MatchParam {
  noticeId: string;
}

const ViewNotice: React.FC<RouteComponentProps<MatchParam>> = ({ match }) => {
  //* History
  const history = useHistory();

  const noticeMockData = Notice;
  const { noticeId } = match.params;
  const {
    imageUrl,
    title,
    date,
    end,
    space,
    writer,
    explain,
    profileUrl,
    chattingUrl,
  } = noticeMockData.notice[noticeId];

  const endDate = new Date(Number(end));

  return (
    <DetailBaseBorder>
      <PreviousPageButton
        text="뒤로가기"
        iconSize="0"
        iconSizeClassName="text-2xl md:text-3xl lg:text-4xl"
        tailwindTextSize="text-lg md:text-2xl lg:text-3xl"
        className="w-24 md:w-32 lg:w-40 py-4 flex justify-start items-start"
        data-cy="back"
        onClick={() => {
          history.goBack();
        }}
      />
      <div className="flex flex-col mb-20 pb-5 border-b-2">
        <h1 className="text-xl md:text-4xl mb-10 font-bold">{title}</h1>
        <div className="flex items-center justify-between mb-4">
          <div className="w-32 flex justify-around items-center cursor-pointer">
            <img
              src={profileUrl}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <span>{writer}</span>
          </div>
          <span className="align-bottom mr-3">{date}</span>
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
          <img src={imageUrl} alt="map" className="w-full" />
          <p className="w-full text-base md:text-2xl break-words">{explain}</p>
        </div>
        <div className="w-full space-y-3">
          <div>
            <span className="block font-bold text-xl">장소</span>
            <span className="w-full break-words">{space}</span>
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
              https://open.kakao.com/o/gI8chtEddssfsd
            </a>
          </div>
        </div>
      </div>
    </DetailBaseBorder>
  );
};

export default withRouter(ViewNotice);
