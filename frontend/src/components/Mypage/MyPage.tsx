import React from 'react';
import { useLocation } from 'react-router-dom';
import MyPageMenu from './MyPageMenu';
import MyPageInformations from './MyPageInformations';
import ChangeMyPassword from './ChangeMyPassword';

const MyPage = () => {
  const location = useLocation();
  return (
    <div className="h-withOutHeader overflow-y-hidden">
      <div className="flex justify-center items-center font-bold h-1/5 text-3xl shadow-md">
        {location.pathname === '/mypage' && <span>내 정보</span>}
        {location.pathname === '/mypage/changePassword' && (
          <span>비밀번호 변경</span>
        )}
      </div>
      <div className="h-4/5 grid grid-cols-5">
        <MyPageMenu />
        {location.pathname === '/mypage' && <MyPageInformations />}
        {location.pathname === '/mypage/changePassword' && <ChangeMyPassword />}
      </div>
    </div>
  );
};

export default MyPage;
