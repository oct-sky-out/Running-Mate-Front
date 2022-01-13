import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { BiUser } from 'react-icons/bi';

const UserProfile = () => {
  //* react-router
  const history = useHistory();

  //* useState
  const [isMyMenuOpen, setIsMyMenuOpen] = useState(false);

  //* Any Functions
  const moveChangeMyPage = () => {
    history.push('/mypage');
    setIsMyMenuOpen(false);
  };
  const logOut = () => {
    setIsMyMenuOpen(false);
  };

  const moveMyPage = () => {
    history.push('/userInfo');
    setIsMyMenuOpen(false);
  };
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
              onClick={moveMyPage}
            >
              <button type="button">내 페이지</button>
            </div>
            <div
              className="flex h-5 md:h-10 md:py-2 justify-center items-center cursor-pointer"
              onClick={moveChangeMyPage}
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
