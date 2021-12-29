import React from 'react';
import { useLocation } from 'react-router-dom';
import MyPageMenu from './MyPageMenu';
import MyPageInformations from './MyPageInformations';
import ChangeMyPassword from './ChangeMyPassword';
import DetailBaseBorder from '../../common/components/DetailBaseBorder';

const MyPage = () => {
  const location = useLocation();
  return (
    <DetailBaseBorder>
      <div className="flex justify-center items-center font-bold h-1/5 text-3xl ">
        {location.pathname === '/mypage' && <span>내 정보</span>}
        {location.pathname === '/mypage/changePassword' && (
          <span>비밀번호 변경</span>
        )}
      </div>
      <div className="my-10">
        <MyPageMenu />
      </div>
      {location.pathname === '/mypage' && <MyPageInformations />}
      {location.pathname === '/mypage/changePassword' && <ChangeMyPassword />}
    </DetailBaseBorder>
  );
};

export default MyPage;
