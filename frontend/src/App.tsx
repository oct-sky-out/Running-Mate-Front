import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import CreateNewCrew from './components/CreateCrew/CreateCrew';
import GuestPage from './components/GuestPage/GuestPage';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import MyPage from './components/Mypage/MyPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/guest" component={GuestPage} />
          <Route exact path="/MyPage" component={MyPage} />
          <Route exact path="/crew/new" component={CreateNewCrew} />
        </Switch>
        <div id="modal" />
      </BrowserRouter>
    </>
  );
}

export default App;
