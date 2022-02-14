import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory, useLocation } from 'react-router-dom';
import { v4 } from 'uuid';
import { BsPeopleFill } from 'react-icons/bs';
import { GiPositionMarker } from 'react-icons/gi';
import { BiUser } from 'react-icons/bi';
import { useSelector } from '../../../modules';
import UserService from '../../../lib/api/userService';
import CrewWidget from '../../Crew/CrewDetail/CrewWidget';
import PreviousPageButton from '../../../common/components/PreviousPageButton';

// test data
import userPageMock from '../../../excuteData/UserPageMock/UserPageMock';
import FriendButton from './FriendButton';
import useSwalerts from '../../../common/hooks/useSwalerts';

interface MatchParam {
  id: string;
}

const UserDetail: React.FC<RouteComponentProps<MatchParam>> = ({ match }) => {
  //* react-router-dom
  const history = useHistory();
  const location = useLocation();

  //* redux
  const { userData, token } = useSelector((state) => ({
    userData: state.signIn.userData,
    token: state.signIn.token,
  }));

  //* useState
  const [normalCategory, setNormalCategory] = useState({
    crewName: { icon: BsPeopleFill, title: '소속 크루', description: '' },
    address: { icon: GiPositionMarker, title: '러닝 지역', description: '' },
  });

  const { errorToast } = useSwalerts();

  //* useEffects
  useEffect(() => {
    setNormalCategory({
      crewName: { icon: BsPeopleFill, title: '소속 크루', description: '' },
      address: {
        icon: GiPositionMarker,
        title: '러닝 지역',
        description: '',
      },
    });
    new UserService()
      .getUser(match.params.id, token)
      .then((result) => {
        if (result) {
          setNormalCategory({
            crewName: {
              ...normalCategory.crewName,
              description: result.crewName || '크루에 소속되어있지 않습니다.',
            },
            address: {
              ...normalCategory.address,
              description: result.address,
            },
          });
        }
      })
      .catch(() => {
        errorToast('사용자 정보 오류', '사용자 정보 조회를 실패했습니다..');
      });
  }, [token, location.pathname]);

  return (
    <>
      <div className="flex items-center justify-between">
        <PreviousPageButton
          text="뒤로가기"
          onClick={() => history.goBack()}
          className="w-24 md:w-32 lg:w-40 py-4 flex justify-start items-start"
          iconSizeClassName="text-2xl md:text-3xl lg:text-4xl"
          tailwindTextSize="text-sm md:text-2xl"
        />
      </div>
      <div className="w-full mx-auto my-0 py-5 flex flex-col flex-wrap justify-center items-center space-y-5 my-10">
        <div className="w-full flex justify-center items-center">
          <BiUser
            size="48"
            color="#8b8bf5"
            className="w-48 h-48 rounded-full border-4 border-purple"
          />
        </div>
        <div className="text-lg flex flex-col items-center">
          <span className="mb-3 text-3xl font-bold">{match.params.id}</span>
        </div>
      </div>
      <div className="space-y-5">
        {match.params.id !== userData.nickName && token && (
          <div className="w-full my-5 pl-5 md:pl-0 ">
            <FriendButton userNickName={match.params.id} />
          </div>
        )}
        <span className="pl-5 md:pl-0 text-lg">기본정보</span>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mx-auto gap-5">
          {Object.values(normalCategory).map((category) => (
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
        <div>
          <span className="pl-5 md:pl-0 text-lg">기록</span>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mx-auto gap-5 pt-10">
            {userPageMock.map((category) => (
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
      </div>
    </>
  );
};

export default UserDetail;
