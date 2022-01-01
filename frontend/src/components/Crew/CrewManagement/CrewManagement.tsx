import React from 'react';
import { withRouter, useHistory, RouteComponentProps } from 'react-router-dom';
import DetailBaseBorder from '../../../common/components/DetailBaseBorder';
import PreviousPageButton from '../../../common/components/PreviousPageButton';
import crewMock from '../../../excuteData/CrewMock/CrewMock';
import CrewManagementMenu from './CrewManagementMenu';
import Management from './Management';
import PeopleManagement from './PeopleManagement';

interface MatchParam {
  id: string;
}

const CrewManagement: React.FC<RouteComponentProps<MatchParam>> = ({
  match,
}) => {
  const history = useHistory();
  console.log(match.path.toLowerCase().includes('peoplemanagement'));
  return (
    <DetailBaseBorder>
      <PreviousPageButton
        text="뒤로가기"
        iconSize="32"
        onClick={() => history.goBack()}
        className="w-28"
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
      {match.path.toLowerCase().includes('peoplemanagement') ? (
        <PeopleManagement />
      ) : (
        <Management />
      )}
    </DetailBaseBorder>
  );
};

export default withRouter(CrewManagement);
