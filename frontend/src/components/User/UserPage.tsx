import { Route, Switch } from 'react-router-dom';
import DetailBaseBorder from '../../common/components/DetailBaseBorder';
import MyPage from './Mypage/MyPage';
import UserDetail from './UserDetail/UserDetail';

const UserPage = () => {
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
