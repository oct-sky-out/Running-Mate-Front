import React from 'react';
import { Route, useHistory, RouteComponentProps } from 'react-router-dom';
import DetailBaseBorder from '../../../common/components/DetailBaseBorder';
import PreviousPageButton from '../../../common/components/PreviousPageButton';
import crewMock from '../../../excuteData/CrewMock/CrewMock';
import CrewDelete from './CrewDelete';
import CrewManagementMenu from './CrewManagementMenu';
import Management from './Management';
import PeopleManagement from './PeopleManagement';

interface MatchParam {
  id: string;
}

const CrewManagement: React.FC<RouteComponentProps<MatchParam>> = ({
  match,
}) => {
  //* react router dom
  const history = useHistory();
  return (
    <DetailBaseBorder>
      <PreviousPageButton
        text="뒤로가기"
        onClick={() => history.goBack()}
        className="w-24 md:w-32 lg:w-40 py-4 flex justify-start items-start"
        iconSizeClassName="text-2xl md:text-3xl lg:text-4xl"
        tailwindTextSize="text-sm md:text-2xl"
      />
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
      <CrewManagementMenu />
      <Route path={`${match.path}/management`} component={Management} />
      <Route
        path={`${match.path}/peoplemanagement`}
        component={PeopleManagement}
      />
      <Route path={`${match.path}/delete`} component={CrewDelete} />
    </DetailBaseBorder>
  );
};

export default CrewManagement;
