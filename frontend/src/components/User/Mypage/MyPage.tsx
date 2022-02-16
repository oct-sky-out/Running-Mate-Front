import { Route, useLocation } from 'react-router-dom';
import { v4 } from 'uuid';
import { useSelector } from '../../../modules';
import MyPageMenu from './MyPageMenu';
import MyPageInformations from './MyPageInformations';
import ChangeMyPassword from './ChangeMyPassword';
import LeaveAccount from './LeaveAccount';
import FriendsList from './FriendsList';
import RequestFriendsManagement from './RequestFriendsManagement';
import MyBoards from './MyBoards';

const MyPage = () => {
  const location = useLocation();
  const menuTexts: { [key: string]: string } = {
    '/user/mypage': '정보 관리',
    '/user/mypage/changePassword': '비밀번호 변경',
    '/user/mypage/myBoards': '작성글',
    '/user/mypage/friends/list': '친구관리',
    '/user/mypage/leaving': '회원탈퇴',
  };
  const token = useSelector((state) => state.signIn.token);

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
