import React, { useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../modules';
import { crewActions } from '../../../modules/crew';
import CrewService from '../../../lib/api/crewService';
import DetailBaseBorder from '../../../common/components/DetailBaseBorder';
import PreviousPageButton from '../../../common/components/PreviousPageButton';
import NextPageButton from '../../../common/components/NextPageButton';
import useSwalerts from '../../../common/hooks/useSwalerts';
import LeaveCrewButton from './LeaveCrewButton';
import CrewNormalInformation from './CrewNormalInformation';
import CrewSignUpRequestButton from './CrewSignUpRequestButton';
import CrewDetailInformation from './CrewDetailInformation';

interface MatchParam {
  id: string;
}

const CrewDetail: React.FC<RouteComponentProps<MatchParam>> = ({ match }) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const {
    crewName,
    crewLeaderId,
    crewRequestFetch,
    userId,
    userNickName,
    isCrewLeader,
    userCrewName,
  } = useSelector((state) => ({
    crewName: state.crew.crewName,
    crewLeaderId: state.crew.crewLeaderId,
    crewRequestFetch: state.crew.crewRequestFetch,
    userId: state.signIn.userData.id,
    userNickName: state.signIn.userData.nickName,
    isCrewLeader: state.signIn.userData.crewLeader,
    userCrewName: state.signIn.userData.crewName,
  }));
  const { errorToast, successAlert, errorAlert } = useSwalerts();

  useEffect(() => {
    new CrewService()
      .getCrewDetail(match.params.id)
      .then((data) => {
        const isRequested = data.requestUsers.includes(userNickName);
        if (isRequested) dispatch(crewActions.setCrewRequested(true));
        if (!isRequested || isCrewLeader)
          dispatch(crewActions.setCrewRequested(false));
        dispatch(crewActions.setCrewDetail(data));
      })
      .catch(() =>
        errorToast(
          '크루상세 데이터 조회 실패',
          '크루상세 데이터를 조회하는데 실패하였습니다. 죄송합니다.😰'
        )
      );
  }, [match.params.id]);

  useEffect(() => {
    if (crewRequestFetch === 'Success') {
      successAlert(
        '요청 성공!',
        '요청에 성공하였습니다. 크루장이 수락할 때 까지 기다려주세요.😆'
      );
      dispatch(crewActions.initCrewRequestFetch());
    }
    if (crewRequestFetch === 'Failure') {
      errorAlert('요청 실패', '요청에 실패하였습니다. 죄송합니다.😰');
      dispatch(crewActions.initCrewRequestFetch());
    }
  }, [crewRequestFetch]);

  return (
    <DetailBaseBorder>
      <div className="flex items-center justify-between">
        <PreviousPageButton
          text="뒤로가기"
          onClick={() => history.goBack()}
          className="w-24 md:w-32 lg:w-40 py-4 flex justify-start items-start"
          iconSizeClassName="text-2xl md:text-3xl lg:text-4xl"
          tailwindTextSize="text-sm md:text-2xl"
        />
        {+userId === crewLeaderId && (
          <NextPageButton
            text="크루 관리하기"
            nextPageURL={`/crew/${match.params.id}/management`}
            className="w-20 md:w-44 lg:w-52 py-4 flex justify-start items-start"
            iconSizeClassName="text-2xl md:text-3xl lg:text-4xl"
            tailwindTextSize="text-sm md:text-2xl"
          />
        )}
      </div>
      <div className="w-full mx-auto my-0 py-5 flex flex-col flex-wrap justify-center items-center space-y-5">
        <CrewDetailInformation />
        {userCrewName === crewName && +userId !== crewLeaderId && (
          <div className="w-full ml-3 lg:ml-10">
            <LeaveCrewButton />
          </div>
        )}
      </div>
      <div className="space-y-5">
        <CrewSignUpRequestButton />
        <CrewNormalInformation />
      </div>
    </DetailBaseBorder>
  );
};

export default CrewDetail;
