import { Suspense, useEffect, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from './modules';
import useLocalStroeageData from './hooks/useLocalStorageData';
import CreateNotice from './components/Board/CreateNotice/CreateNotice';
import GuestPage from './components/GuestPage/GuestPage';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import ViewNotice from './components/Board/ViewNotice/ViewNotice';
import EditNotice from './components/Board/EditNotice/EditNotice';
import SuspenseLoading from './components/Loading/SuspenseLoading';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

//* code spliting
const UserPage = lazy(() => import('./components/User/UserPage'));
const Crew = lazy(() => import('./components/Crew/Crew'));
const CrewList = lazy(() => import('./components/Crew/CrewListPage'));

function App() {
  const token = useSelector((state) => state.signIn.token);
  const { getToken, getUserData } = useLocalStroeageData();

  useEffect(() => {
    getUserData();
    getToken();
  }, [token]);

  return (
    <>
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={SuspenseLoading}>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/guest" component={GuestPage} />
              <Route path="/user/" component={UserPage} />
              <Route path="/crewList" component={CrewList} />
              <Route path="/crew" component={Crew} />
              <Route exact path="/boards/run/:runId" component={ViewNotice} />
              <Route exact path="/boards/edit/run/:id" component={EditNotice} />
              <Route exact path="/boards/create/run" component={CreateNotice} />
            </Switch>
            <div id="modal" />
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
