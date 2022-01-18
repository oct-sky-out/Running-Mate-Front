import { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from './modules';
import useLocalStroeageData from './hooks/useLocalStorageData';
import CreateNotice from './components/CreateNotice/CreateNotice';
import CreateNewCrew from './components/Crew/CreateCrew/CreateCrew';
import Crew from './components/Crew/Crew';
import CrewDetail from './components/Crew/CrewDetail/CrewDetail';
import CrewManagement from './components/Crew/CrewManagement/CrewManagement';
import GuestPage from './components/GuestPage/GuestPage';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import MyPage from './components/Mypage/MyPage';
import ViewNotice from './components/ViewNotice/ViewNotice';
import UserPage from './components/UserPage/Userpage';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.signIn.token);
  const { getToken } = useLocalStroeageData();

  useEffect(() => {
    getToken();
  }, [token]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/guest" component={GuestPage} />
          <Route exact path="/userInfo/:id" component={UserPage} />
          <Route path="/myPage" component={MyPage} />
          <Route exact path="/crewList" component={Crew} />
          <Route exact path="/crewList/:id" component={CrewDetail} />
          <Route exact path="/crew/new" component={CreateNewCrew} />
          <Route path="/crew/:id" component={CrewManagement} />
          <Route exact path="/notice/:noticeId" component={ViewNotice} />
          <Route exact path="/notice-create" component={CreateNotice} />
        </Switch>
        <div id="modal" />
      </BrowserRouter>
    </>
  );
}

export default App;
