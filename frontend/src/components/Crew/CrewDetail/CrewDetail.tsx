import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiFillTrophy } from 'react-icons/ai';
import { BsPeopleFill } from 'react-icons/bs';
import { GiPositionMarker } from 'react-icons/gi';
import { v4 } from 'uuid';
import { useSelector } from '../../../modules';
import { crewActions } from '../../../modules/crew';
import CrewService from '../../../lib/api/crewService';
import CrewWidget from './CrewWidget';
import DetailBaseBorder from '../../../common/components/DetailBaseBorder';
import PreviousPageButton from '../../../common/components/PreviousPageButton';
import NextPageButton from '../../../common/components/NextPageButton';

// test data
import crewMock from '../../../excuteData/CrewMock/CrewMock';
import useLocalStroeageData from '../../../hooks/useLocalStorageData';

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
    userId,
  } = useSelector((state) => ({
    crewName: state.crew.crewName,
    crewLeaderId: state.crew.crewLeaderId,
    crewRegion: state.crew.crewRegion,
    explanation: state.crew.explanation,
    openChat: state.crew.openChat,
    crewUserCount: state.crew.userDtos.length,
    userId: state.signIn.userData.id,
  }));
  const { getUserData } = useLocalStroeageData();

  const normalCategory = [
    { icon: BsPeopleFill, title: '크루 인원', description: crewUserCount },
    { icon: GiPositionMarker, title: '크루 지역', description: crewRegion },
  ];

  useEffect(() => {
    new CrewService()
      .getCrewDetail(match.params.id)
      .then((data) => dispatch(crewActions.setCrewDetail(data)))
      .catch((reason) => console.error(reason));
  }, [match.params.id]);

  useEffect(() => {
    getUserData();
  }, []);

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
        {+userId === crewLeaderId ? (
          <NextPageButton
            text="크루 관리하기"
            nextPageURL={`/crew/${match.params.id}/management`}
            className="w-20 md:w-44 lg:w-52 py-4 flex justify-start items-start"
            iconSizeClassName="text-2xl md:text-3xl lg:text-4xl"
            tailwindTextSize="text-sm md:text-2xl"
          />
        ) : null}
      </div>
      <div className="w-full mx-auto my-0 py-5 flex flex-col flex-wrap justify-center items-center space-y-5">
        <div className="w-full flex justify-center items-center">
          <img
            src={crewMock.crew[0].imageUrl}
            alt=""
            className="w-48 rounded-full border-4 border-purple "
          />
        </div>
        <div className="text-2xl">{crewName}</div>
        <div className="text-lg">
          <span>{explanation}</span>
        </div>
        <div className="text-lg">
          <span>오픈 채팅 : {openChat}</span>
          <span>
            <a href={openChat}>{openChat}</a>
          </span>
        </div>
      </div>
      <div className="space-y-5">
        <span className="pl-5 md:pl-0 text-lg">기본정보</span>
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
