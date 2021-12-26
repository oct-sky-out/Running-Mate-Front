import React from 'react';
import { useHistory, withRouter, RouteComponentProps } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Notice from '../../excuteData/NoticeMock/NoticeMock';

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
    <div className="flex flex-col justify-center items-center">
      <div className="w-3/5">
        <button
          type="button"
          className="py-4 flex items-center mb-4"
          data-cy="back"
          onClick={() => {
            history.goBack();
          }}
        >
          <FaArrowLeft className="mx-2 text-3xl" />
        </button>
        <div className="flex flex-col mb-20 pb-5 border-b-2">
          <h1 className="text-4xl mb-10 font-bold">{title}</h1>
          <div className="flex items-centeren justify-between mb-4">
            <div className="flex items-center cursor-pointer">
              <img
                src={profileUrl}
                alt="profile"
                className="w-10 h-10 mx-3 rounded-full"
              />
              <span>{writer}</span>
            </div>
            <span className="mr-3">{date}</span>
          </div>
          <div className="text-right mr-4">
            <button type="button" className="cursor-pointer">
              수정{' '}
            </button>
            <span>/</span>
            <button type="button" className="cursor-pointer">
              {' '}
              삭제
            </button>
          </div>
        </div>
        <div>
          <div className="flex justify-center mb-20">
            <img src={imageUrl} alt="map" className="w-2/5" />
            <p className="w-2/5 ml-9 text-xl break-words">{explain}</p>
          </div>
          <div className="pl-4">
            <span className="block font-bold mb-3 text-xl">
              장소: &ensp;{space}
            </span>
            <span className="block font-bold mb-3 text-xl">
              시간: &ensp;
              {`${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDate()} ${
                endDate.getHours() < 10
                  ? `0${endDate.getHours()}`
                  : endDate.getHours()
              }:${
                endDate.getMinutes() < 10
                  ? `0${endDate.getMinutes()}`
                  : endDate.getMinutes()
              }: ${
                endDate.getSeconds() < 10
                  ? `0${endDate.getSeconds()}`
                  : endDate.getSeconds()
              }`}
            </span>
            <span className="block font-bold mb-3 text-xl">
              오픈 채팅방 링크: &ensp;{chattingUrl}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ViewNotice);
