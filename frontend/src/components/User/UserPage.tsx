import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import DetailBaseBorder from '../../common/components/DetailBaseBorder';
import useValidToken from '../../common/hooks/useValidToken';
import { useSelector } from '../../modules';
import MyPage from './Mypage/MyPage';
import UserDetail from './UserDetail/UserDetail';

const UserPage = () => {
  const location = useLocation();
  const token = useSelector((state) => state.signIn.token);
  const checkTokenAvailable = useValidToken();
  useEffect(() => {
    checkTokenAvailable(token);
  }, [location.pathname]);

  return (
    <DetailBaseBorder>
      <Switch>
        <Route path="/user/myPage" component={MyPage} />
        <Route path="/user/:id" component={UserDetail} />
      </Switch>
    </DetailBaseBorder>
  );
};

export default UserPage;
