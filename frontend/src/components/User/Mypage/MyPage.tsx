import { useEffect } from 'react';
import { Route, useLocation, useHistory } from 'react-router-dom';
import { v4 } from 'uuid';
import MyPageMenu from './MyPageMenu';
import MyPageInformations from './MyPageInformations';
import ChangeMyPassword from './ChangeMyPassword';
import LeaveAccount from './LeaveAccount';
import FriendsList from './FriendsList';
import useValidToken, {
  CheckTokenResultType,
} from '../../../common/hooks/useValidToken';
import RequestFriendsManagement from './RequestFriendsManagement';
import MyBoards from './MyBoards';
import useSwalerts from '../../../common/hooks/useSwalerts';

const MyPage = () => {
  const location = useLocation();
  const history = useHistory();
  const menuTexts: { [key: string]: string } = {
    '/user/mypage': '정보 관리',
    '/user/mypage/changePassword': '비밀번호 변경',
    '/user/mypage/myBoards': '작성글',
    '/user/mypage/friends/list': '친구관리',
    '/user/mypage/leaving': '회원탈퇴',
  };
  const token = localStorage.getItem('token');
  const { checkTokenAvailable } = useValidToken();
  const { errorToast } = useSwalerts();
  const tokenValidCallback = (result: CheckTokenResultType) => {
    if (!result.tokenState) {
      console.error(result.message);
      history.push('/guest');
    }
  };
  const tokenNotValidCallback = () => {
    errorToast(
      '사용자 정보 오류',
      '사용자 정보가 만료되었거나 존재하지않습니다.'
    ).then(() => {
      history.push('/guest');
    });
  };

  useEffect(() => {
    checkTokenAvailable(token, tokenValidCallback, tokenNotValidCallback);
  }, [location.pathname]);

  return (
    <>
      <div className="flex justify-center items-center font-bold h-1/5 text-3xl">
        {Object.keys(menuTexts).map(
          (url) =>
            location.pathname === url && (
              <span key={v4()}>{menuTexts[url]}</span>
            )
        )}
        {location.pathname === '/user/mypage/friends/requests' && (
          <span>친구 요청 관리</span>
        )}
      </div>
      <div className="my-10">
        <MyPageMenu menuTexts={menuTexts} />
      </div>
      <Route
        exact
        path="/user/mypage"
        render={() => <MyPageInformations token={token || ''} />}
      />
      <Route
        exact
        path="/user/mypage/changePassword"
        component={ChangeMyPassword}
      />
      <Route exact path="/user/mypage/leaving" component={LeaveAccount} />
      <Route exact path="/user/mypage/friends/list" component={FriendsList} />
      <Route
        exact
        path="/user/mypage/friends/requests"
        component={RequestFriendsManagement}
      />
      <Route exact path="/user/mypage/myBoards" component={MyBoards} />
    </>
  );
};

export default MyPage;
