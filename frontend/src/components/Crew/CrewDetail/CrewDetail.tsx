import React from 'react';
import {
  withRouter,
  RouteComponentProps,
  useHistory,
  Link,
} from 'react-router-dom';
import { BsPeopleFill } from 'react-icons/bs';
import { GiPositionMarker } from 'react-icons/gi';
import { v4 } from 'uuid';
import CrewWidget from './CrewWidget';
import DetailBaseBorder from '../../../common/components/DetailBaseBorder';
import PreviousPageButton from '../../../common/components/PreviousPageButton';

// test data
import crewMock from '../../../excuteData/CrewMock/CrewMock';
import crewRewardMock from '../../../excuteData/CrewMock/CrewRewardMock';
import NextPageButton from '../../../common/components/NextPageButton';

interface MatchParam {
  id: string;
}

const CrewDetail: React.FC<RouteComponentProps<MatchParam>> = ({ match }) => {
  const history = useHistory();
  const normalCategory = [
    { icon: BsPeopleFill, title: '크루 인원', description: '100' },
    { icon: GiPositionMarker, title: '크루 지역', description: '서울 상도동' },
  ];
  const mockLeaderState = true;

  return (
    <DetailBaseBorder>
      <PreviousPageButton
        text="뒤로가기"
        iconSize="32"
        onClick={() => history.goBack()}
        className="w-28"
      />
      {mockLeaderState ? (
        <NextPageButton
          text="크루 관리하기"
          nextPageURL={`/crew/${match.params.id}/management`}
        />
      ) : null}
      <div className="w-full mx-auto my-0 py-5 flex flex-col flex-wrap justify-center items-center space-y-5">
        <div className="w-full flex justify-center items-center">
          <img
            src={crewMock.crew[0].imageUrl}
            alt=""
            className="w-48 rounded-full border-4 border-purple "
          />
        </div>
        <div className="text-2xl">{match.params.id}</div>
        <div className="text-lg">
          <span>오픈 채팅 : </span>
          <span>
            <a href="http://kakao.com/openchat">http://kakao.com/openchat</a>
          </span>
        </div>
      </div>
      <div className="space-y-5">
        <span className="text-lg">기본정보</span>
        <div className="flex flex-wrap items-end space-y-5">
          {normalCategory.map((category) => (
            <CrewWidget
              key={v4()}
              Icon={category.icon}
              widgetTitle={category.title}
              widgetDescription={category.description}
              iconColor="#8b8bf5"
            />
          ))}
        </div>
        <div>
          <span className="text-lg">리워드</span>
          <div className=" flex flex-wrap items-end space-y-5">
            {crewRewardMock.map((category) => (
              <div key={v4()}>
                <CrewWidget
                  Icon={category.icon}
                  widgetTitle={category.title}
                  widgetDescription={category.description}
                  iconColor="#8b8bf5"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DetailBaseBorder>
  );
};

export default withRouter(CrewDetail);
