import React from 'react';
import {
  withRouter,
  RouteComponentProps,
  useHistory,
  Link,
} from 'react-router-dom';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { BsPeopleFill } from 'react-icons/bs';
import { GiPositionMarker } from 'react-icons/gi';
import { v4 } from 'uuid';
import CrewWidget from './CrewWidget';

// test data
import crewMock from '../../excuteData/CrewMock/CrewMock';
import crewRewardMock from '../../excuteData/CrewMock/CrewRewardMock';

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
    <div className="w-4/5 mx-auto my-20 p-10 border rounded-3xl shadow-lg relative ">
      <div
        className="w-28 flex justify-center items-center cursor-pointer"
        onClick={history.goBack}
      >
        <GrFormPrevious size="32" />
        <span>뒤로가기</span>
      </div>
      {mockLeaderState ? (
        <Link to={`/crew/${match.params.id}/management`}>
          <div className="absolute top-10 right-10 w-32 flex justify-center items-center cursor-pointer">
            <span>크루 관리하기</span>
            <GrFormNext size="32" />
          </div>
        </Link>
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
    </div>
  );
};

export default withRouter(CrewDetail);
