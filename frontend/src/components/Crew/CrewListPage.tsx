import { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import useValidToken from '../../common/hooks/useValidToken';
import { useSelector } from '../../modules';
import CrewDetail from './CrewDetail/CrewDetail';
import CrewList from './CrewList/CrewList';

const CrewListPage = () => {
  const location = useLocation();
  const token = useSelector((state) => state.signIn.token);
  const checkTokenAvailable = useValidToken();
  useEffect(() => {
    if (location.pathname !== '/crewList') checkTokenAvailable(token);
  }, [location.pathname]);

  return (
    <Switch>
      <Route exact path="/crewList" component={CrewList} />
      <Route path="/crewList/:id" component={CrewDetail} />
    </Switch>
  );
};

export default CrewListPage;
