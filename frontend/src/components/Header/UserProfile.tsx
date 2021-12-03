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
  const moveMyPage = () => {
    history.push('/mypage');
    setIsMyMenuOpen(false);
  };
  const logOut = () => {
    setIsMyMenuOpen(false);
  };

  return (
    <div className="flex-none flex w-32 items-center">
      <OutsideClickHandler
        onOutsideClick={() => {
          if (isMyMenuOpen) setIsMyMenuOpen(false);
        }}
      >
        <BiUser
          size="32"
          color="#8b8bf5"
          className="border-2 rounded-full border-purple cursor-pointer"
          onClick={() => setIsMyMenuOpen(!isMyMenuOpen)}
        />
        {isMyMenuOpen && (
          <div className="absolute top-16 right-16 border-2 w-64 rounded border-purple bg-white divide-y-2 divide-purple divide-solid">
            <div
              className="flex h-10 py-2 justify-center items-center cursor-pointer"
              onClick={moveMyPage}
            >
              <button type="button">내 정보관리</button>
            </div>
            <div
              className="flex h-10 py-2 justify-center items-center cursor-pointer"
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
