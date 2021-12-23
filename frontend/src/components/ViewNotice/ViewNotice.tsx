import React from 'react';
import { useHistory, withRouter, RouteComponentProps } from 'react-router-dom';

import Notice from '../../excuteData/NoticeMock/NoticeMock';

interface MatchParam {
  noticeId: string;
}

const ViewNotice: React.FC<RouteComponentProps<MatchParam>> = ({ match }) => {
  //* History
  const history = useHistory();

  const noticeMockData = Notice;
  const { noticeId } = match.params;
  const notice = noticeMockData.notice[noticeId];
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
  } = notice;

  const goBack = () => {
    history.goBack();
  };

  return (
    <div>
      <div>
        <div onClick={goBack}>뒤로가기</div>
      </div>
      <div>
        <h1>{title}</h1>
        <div>
          <img
            src={profileUrl}
            alt="profile"
            className="w-10 h-10 rouned-full"
          />
          <span>{writer}</span>
          <span>{date}</span>
        </div>
        <div>
          <button type="button">수정</button>/
          <button type="button">삭제</button>
        </div>
      </div>
      <div>
        <img src={imageUrl} alt="map" />
        <div>
          <span>{explain}</span>
        </div>
        <span className="block">{space}</span>
        <span className="block">{end}</span>
        <span className="block">{chattingUrl}</span>
      </div>
    </div>
  );
};

export default withRouter(ViewNotice);
