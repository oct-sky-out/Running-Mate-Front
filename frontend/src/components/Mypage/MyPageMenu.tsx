import React from 'react';
import { v4 } from 'uuid';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import { FaChevronCircleRight } from 'react-icons/fa';
import MenuButton from '../../common/components/MenuButton';

const MyPageMenu = () => {
  const menuTexts: { [key: string]: string } = {
    '/mypage': '내 정보 관리',
    '/mypage/changePassword': '비밀번호 변경',
  };

  const history = useHistory();
  const location = useLocation();

  const moveURL = (url: string) => {
    history.push(url);
  };

  return (
    <div className="flex justify-center w-full">
      {Object.keys(menuTexts).map((url) => (
        <MenuButton
          type="button"
          className={`flex flex-left items-center text-xl font-bold ${
            location.pathname === url ? 'border-purple' : null
          }`}
          onClick={() => moveURL(url)}
        >
          {menuTexts[url]}
        </MenuButton>
      ))}
    </div>
  );
};

export default withRouter(MyPageMenu);
