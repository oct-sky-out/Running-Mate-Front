import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';
import { BiUser } from 'react-icons/bi';
import { useSelector } from '../../modules';
import { SignInActions } from '../../modules/signIn';
import useSwalerts from '../../common/hooks/useSwalerts';

const UserProfile = () => {
  //* react-router
  const history = useHistory();

  //* redux
  const { userNickName, token, signInFetchStatus } = useSelector((state) => ({
    userNickName: state.signIn.userData.nickName,
    token: state.signIn.token,
    signInFetchStatus: state.signIn.signInFetchStatus,
  }));
  const dispatch = useDispatch();

  //* useState
  const [isMyMenuOpen, setIsMyMenuOpen] = useState(false);

  const { errorToast, successToast } = useSwalerts();

  //* Any Functions
  const moveMyPage = () => {
    history.push('/user/mypage');
    setIsMyMenuOpen(false);
  };
  const logOut = () => {
    dispatch(SignInActions.logOut(token));
  };

  const moveMyInformationPage = () => {
    history.push(`/user/${userNickName}`);
    setIsMyMenuOpen(false);
  };

  useEffect(() => {
    if (signInFetchStatus === 'LogOut') {
      successToast('로그아웃', '로그아웃이 안전하게 완료되었습니다.');
      dispatch(SignInActions.setInitError());
      history.push('/');
    }
    if (signInFetchStatus === 'LogOutError') {
      errorToast('로그아웃 오류', '죄송합니다. 로그아웃을 실패하였습니다.😰');
      dispatch(SignInActions.setInitError());
    }
  }, [signInFetchStatus]);

  return (
    <div className="flex-none flex justify-center items-center w-5 md:w-20">
      <OutsideClickHandler
        onOutsideClick={() => {
          if (isMyMenuOpen) setIsMyMenuOpen(false);
        }}
      >
        <BiUser
          size="32"
          color="#8b8bf5"
          className="border-2 rounded-full border-purple cursor-pointer w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
          onClick={() => setIsMyMenuOpen(!isMyMenuOpen)}
        />
        {isMyMenuOpen && (
          <div className="absolute w-24 lg:w-64 md:w-48 top-12 right-4 md:top-16 md:right-12 text-xs md:text-base border-2 rounded border-purple bg-white divide-y-2 divide-purple divide-solid">
            <div
              className="flex h-5 md:h-10 md:py-2 justify-center items-center cursor-pointer"
              onClick={moveMyInformationPage}
            >
              <button type="button">내 프로필 보기</button>
            </div>
            <div
              className="flex h-5 md:h-10 md:py-2 justify-center items-center cursor-pointer"
              onClick={moveMyPage}
            >
              <button type="button">내 정보관리</button>
            </div>
            <div
              className="flex h-5 md:h-10 md:py-2 justify-center items-center cursor-pointer"
              onClick={logOut}
            >
              <button type="button">로그아웃</button>
            </div>
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default UserProfile;
