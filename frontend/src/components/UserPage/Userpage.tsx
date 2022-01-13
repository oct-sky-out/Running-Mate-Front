import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RouteComponentProps, useHistory, useLocation } from 'react-router-dom';
import { BsPeopleFill } from 'react-icons/bs';
import { GiPositionMarker } from 'react-icons/gi';
import { v4 } from 'uuid';
import { BiUser } from 'react-icons/bi';
import { useSelector } from '../../modules';
import CrewWidget from '../Crew/CrewDetail/CrewWidget';
import DetailBaseBorder from '../../common/components/DetailBaseBorder';
import PreviousPageButton from '../../common/components/PreviousPageButton';

// test data
import userPageMock from '../../excuteData/UserPageMock/UserPageMock';
import { IUserData } from '../../modules/types/signInTypes';
import useLocalStroeageData from '../../hooks/useLocalStorageData';
import axios from '../../lib/api/axios';
import UserService from '../../lib/api/userService';

interface MatchParam {
  id: string;
}

const UserPage: React.FC<RouteComponentProps<MatchParam>> = ({ match }) => {
  //* react-router-dom
  const history = useHistory();
  const location = useLocation();

  //* redux
  const { userData, token } = useSelector((state) => ({
    userData: state.signIn.userData,
    token: state.signIn.token,
  }));

  //* useState
  const [anotherUserData, setAnotherUserData] = useState<IUserData>({
    address: '',
    crewLeader: false,
    crewName: '',
    email: '',
    id: '',
    nickName: '',
  });
  const [normalCategory, setNormalCategory] = useState({
    crewName: { icon: BsPeopleFill, title: '소속 크루', description: '' },
    address: { icon: GiPositionMarker, title: '러닝 지역', description: '' },
  });

  //* custom hook
  const { getUserData } = useLocalStroeageData();

  //* useEffects
  useEffect(() => {
    if (!match.params.id) {
      getUserData();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!match.params.id)
      setNormalCategory({
        crewName: {
          ...normalCategory.crewName,
          description: userData.crewName || '크루에 소속되어있지 않습니다.',
        },
        address: { ...normalCategory.address, description: userData.address },
      });
  }, [userData]);

  useEffect(() => {
    setNormalCategory({
      crewName: { icon: BsPeopleFill, title: '소속 크루', description: '' },
      address: {
        icon: GiPositionMarker,
        title: '러닝 지역',
        description: '',
      },
    });
    if (match.params.id && token) {
      new UserService().getUSer(match.params.id, token).then((result) => {
        if (result) {
          setAnotherUserData(result);
          setNormalCategory({
            crewName: {
              ...normalCategory.crewName,
              description: result.crewName || '크루에 소속되어있지 않습니다.',
            },
            address: { ...normalCategory.address, description: result.address },
          });
        }
      });
    }
  }, [token, location.pathname]);

  return (
    <DetailBaseBorder>
      <div className="flex items-center justify-between">
        <PreviousPageButton
          text="뒤로가기"
          iconSize="32"
          onClick={() => history.goBack()}
          className="w-28"
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
          <span className="mb-3 text-3xl font-bold">
            {match.params.id || userData.nickName}
          </span>
        </div>
        {(match.params.id || token) && (
          <button className="text-white w-24 h-12 rounded-xl sm:absolute sm:right-10 sm:top-32 md:right-20 md:top-40 bg-indigo-400 hover:opacity-80 transition ease-in-out delay-100">
            친구신청
          </button>
        )}
      </div>
      <div className="space-y-5">
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
    </DetailBaseBorder>
  );
};

export default UserPage;
