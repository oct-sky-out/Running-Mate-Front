import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, useHistory, RouteComponentProps } from 'react-router-dom';
import PreviousPageButton from '../../../common/components/PreviousPageButton';
import useSwalerts from '../../../common/hooks/useSwalerts';
import CrewService from '../../../lib/api/crewService';
import { useSelector } from '../../../modules';
import { crewActions } from '../../../modules/crew';
import CrewDelete from './CrewDelete';
import CrewManagementMenu from './CrewManagementMenu';
import CrewRequestManagement from './CrewRequestManagement';
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
  const dispatch = useDispatch();
  const { crewId, crewOpenChatLink } = useSelector((state) => ({
    crewId: state.crew.id,
    crewOpenChatLink: state.crew.openChat,
  }));
  const { errorToast } = useSwalerts();
  useEffect(() => {
    if (crewId === 0)
      new CrewService()
        .getCrewDetail(match.params.id)
        .then((data) => dispatch(crewActions.setCrewDetail(data)))
        .catch(() => {
          errorToast('데이터 조회 실패', '데이터 조회에 실패했습니다.😰');
        });
  }, []);

  return (
    <>
      <PreviousPageButton
        text="뒤로가기"
        onClick={() => history.goBack()}
        className="w-24 md:w-32 lg:w-40 py-4 flex justify-start items-start"
        iconSizeClassName="text-2xl md:text-3xl lg:text-4xl"
        tailwindTextSize="text-sm md:text-2xl"
      />
      <div className="w-full mx-auto my-0 py-5 flex flex-col flex-wrap justify-center items-center space-y-5">
        <div className="w-full flex justify-center items-center">
          {/* <img
            src=""
            alt=""
            className="w-48 rounded-full border-4 border-purple "
          /> */}
          크루이미지는 현재 개발중입니다.🚧
        </div>
        <div className="text-2xl">{match.params.id}</div>
        <div className="text-lg">
          <span>오픈 채팅 : </span>
          <span>
            <a href={crewOpenChatLink}>{crewOpenChatLink}</a>
          </span>
        </div>
      </div>
      <CrewManagementMenu />
      <Route path={`${match.path}/management`} component={Management} />
      <Route
        path={`${match.path}/peoplemanagement`}
        component={PeopleManagement}
      />
      <Route
        path={`${match.path}/requestmanagement`}
        component={CrewRequestManagement}
      />
      <Route path={`${match.path}/delete`} component={CrewDelete} />
    </>
  );
};

export default CrewManagement;
