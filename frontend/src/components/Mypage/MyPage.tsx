import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from '../../modules';
import MyPageMenu from './MyPageMenu';
import MyPageInformations from './MyPageInformations';
import ChangeMyPassword from './ChangeMyPassword';
import DetailBaseBorder from '../../common/components/DetailBaseBorder';
import axios from '../../lib/api/axios';

const MyPage = () => {
  const location = useLocation();
  const history = useHistory();
  const token = useSelector((state) => state.signIn.token);

  useEffect(() => {
    if (!token) {
      history.push('/guest');
    }
    if (token) {
      axios
        .get('/mypage', {
          headers: {
            'x-auth-token': token,
          },
        })
        .then(() => {});
    }
  }, []);
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
      {location.pathname === '/mypage' && <MyPageInformations token={token} />}
      {location.pathname === '/mypage/changePassword' && <ChangeMyPassword />}
    </DetailBaseBorder>
  );
};

export default MyPage;
