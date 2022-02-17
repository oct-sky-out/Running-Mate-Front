import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import DetailBaseBorder from '../../common/components/DetailBaseBorder';
import useValidToken from '../../common/hooks/useValidToken';
import { useSelector } from '../../modules';
import CreateCrew from './CreateCrew/CreateCrew';
import CrewManagement from './CrewManagement/CrewManagement';

const Crew = () => {
  const location = useLocation();
  const token = useSelector((state) => state.signIn.token);
  const checkTokenAvailable = useValidToken();
  useEffect(() => {
    checkTokenAvailable(token);
  }, [location.pathname]);

  return (
    <DetailBaseBorder>
      <Switch>
        <Route exact path="/crew/new" component={CreateCrew} />
        <Route sensitive path="/crew/:id" component={CrewManagement} />
      </Switch>
    </DetailBaseBorder>
  );
};

export default Crew;
