import { useEffect } from 'react';
import { Route, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from '../../modules';
import MyPageMenu from './MyPageMenu';
import MyPageInformations from './MyPageInformations';
import ChangeMyPassword from './ChangeMyPassword';
import LeaveAccount from './LeaveAccount';
import DetailBaseBorder from '../../common/components/DetailBaseBorder';
import useRequireLogin from '../../hooks/useValidToken';

const MyPage = () => {
  const location = useLocation();
  const history = useHistory();
  const token = useSelector((state) => state.signIn.token);
  const { checkToekenAvailable } = useRequireLogin();

  useEffect(() => {
    checkToekenAvailable(token)((result) => {
      if (!result.tokenState) {
        console.error(result.message);
        history.push('/guest');
      }
    });
  }, [location.pathname]);
  return (
    <DetailBaseBorder>
      <div className="flex justify-center items-center font-bold h-1/5 text-3xl">
        {location.pathname === '/mypage' && <span>내 정보</span>}
        {location.pathname === '/mypage/changePassword' && (
          <span>비밀번호 변경</span>
        )}
        {location.pathname === '/mypage/leaving' && <span>회원탈퇴</span>}
      </div>
      <div className="my-10">
        <MyPageMenu />
      </div>
      <Route
        exact
        path="/mypage"
        render={() => <MyPageInformations token={token} />}
      />
      <Route exact path="/mypage/changePassword" component={ChangeMyPassword} />
      <Route exact path="/mypage/leaving" component={LeaveAccount} />
    </DetailBaseBorder>
  );
};

export default MyPage;
