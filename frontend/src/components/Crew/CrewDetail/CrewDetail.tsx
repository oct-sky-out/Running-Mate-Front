import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { BsPeopleFill } from 'react-icons/bs';
import { GiPositionMarker } from 'react-icons/gi';
import { v4 } from 'uuid';
import { useSelector } from '../../../modules';
import { crewActions } from '../../../modules/crew';
import CrewService from '../../../lib/api/crewService';
import useLocalStroeageData from '../../../hooks/useLocalStorageData';
import CrewWidget from './CrewWidget';
import DetailBaseBorder from '../../../common/components/DetailBaseBorder';
import PreviousPageButton from '../../../common/components/PreviousPageButton';
import NextPageButton from '../../../common/components/NextPageButton';
import LeaveCrewButton from './LeaveCrewButton';

interface MatchParam {
  id: string;
}

const CrewDetail: React.FC<RouteComponentProps<MatchParam>> = ({ match }) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const {
    crewName,
    crewLeaderId,
    crewRegion,
    explanation,
    openChat,
    crewUserCount,
    crewRequestFetch,
    crewRequested,
    userId,
    userNickName,
    isCrewLeader,
    userCrewName,
    token,
  } = useSelector((state) => ({
    crewName: state.crew.crewName,
    crewLeaderId: state.crew.crewLeaderId,
    crewRegion: state.crew.crewRegion,
    explanation: state.crew.explanation,
    openChat: state.crew.openChat,
    crewUserCount: state.crew.userDtos.length,
    crewRequestFetch: state.crew.crewRequestFetch,
    crewRequested: state.crew.crewRequested,
    userId: state.signIn.userData.id,
    userNickName: state.signIn.userData.nickName,
    isCrewLeader: state.signIn.userData.crewLeader,
    userCrewName: state.signIn.userData.crewName,
    token: state.signIn.token,
  }));
  const { getUserData } = useLocalStroeageData();

  const normalCategory = [
    { icon: BsPeopleFill, title: '크루 인원', description: crewUserCount },
    { icon: GiPositionMarker, title: '크루 지역', description: crewRegion },
  ];

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
        Swal.fire({
          toast: true,
          icon: 'error',
          title: '크루 상세 데이터 조회 실패',
          position: 'top-end',
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
          showCloseButton: true,
        })
      );
  }, [match.params.id]);

  useEffect(() => {
    if (crewRequestFetch === 'Success') {
      Swal.fire({
        title: '요청 성공!',
        text: '요청에 성공하였습니다. 크루장이 수락할 때 까지 기다려주세요.',
        icon: 'success',
        confirmButtonText: '확인',
      });
      dispatch(crewActions.initCrewRequestFetch());
    }
    if (crewRequestFetch === 'Failure') {
      Swal.fire({
        title: '요청 실패',
        text: '요청에 실패하였습니다. 죄송합니다.',
        icon: 'error',
        confirmButtonText: '확인',
      });
      dispatch(crewActions.initCrewRequestFetch());
    }
  }, [crewRequestFetch]);

  useEffect(() => {
    getUserData();
  }, []);

  const signUpRequestCrew = () => {
    dispatch(crewActions.signUpRequestCrew({ crewName, token }));
  };

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
        <div className="w-full flex justify-center items-center">
          <img
            src=""
            alt=""
            className="w-48 rounded-full border-4 border-purple "
          />
        </div>
        <div className="text-2xl">{crewName}</div>
        <div className="text-lg">
          <span>{explanation}</span>
        </div>
        <div className="text-lg">
          <span>
            <a href={openChat} target="_blank" rel="noreferrer">
              오픈 채팅 : {openChat}
            </a>
          </span>
        </div>
        {userCrewName === crewName && +userId !== crewLeaderId && (
          <div className="w-full ml-3 lg:ml-10">
            <LeaveCrewButton />
          </div>
        )}
      </div>
      <div className="space-y-5">
        <div className="w-20 md:w-44 lg:w-52 pl-5 md:pl-0 py-4 flex flex-grow justify-start items-start">
          {+userId !== crewLeaderId &&
            userCrewName !== crewName &&
            !isCrewLeader && (
              <Button
                auto
                color="#8b8bf5"
                onClick={signUpRequestCrew}
                disabled={crewRequested}
              >
                {crewRequested ? '요청됨' : '가입요청 보내기'}
              </Button>
            )}
        </div>
        <span className="block pl-5 md:pl-0 text-lg">기본정보</span>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mx-auto gap-5">
          {normalCategory.map((category) => (
            <div key={v4()} className="flex justify-center">
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
    </DetailBaseBorder>
  );
};

export default withRouter(CrewDetail);
