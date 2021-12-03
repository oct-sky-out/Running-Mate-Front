import React from 'react';
import MyPageMenu from './MyPageMenu';
import MyPageInformations from './MyPageInformations';

const MyPage = () => {
  return (
    <div className="h-withOutHeader overflow-y-hidden">
      <div className="flex justify-center items-center font-bold h-1/5 text-3xl shadow-md">
        <span>내 정보</span>
      </div>
      <div className="h-4/5 grid grid-cols-5">
        <MyPageMenu />
        <MyPageInformations />
      </div>
    </div>
  );
};

export default MyPage;
