import { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import useValidToken from '../../common/hooks/useValidToken';
import { useSelector } from '../../modules';
import CreateNotice from './CreateNotice/CreateNotice';
import EditNotice from './EditNotice/EditNotice';
import ViewNotice from './ViewNotice/ViewNotice';

const Board = () => {
  const location = useLocation();
  const token = useSelector((state) => state.signIn.token);
  const checkTokenAvailable = useValidToken();
  useEffect(() => {
    checkTokenAvailable(token);
  }, [location.pathname]);

  return (
    <Switch>
      <Route exact path="/boards/run/:runId" component={ViewNotice} />
      <Route exact path="/boards/edit/run/:id" component={EditNotice} />
      <Route exact path="/boards/create/run" component={CreateNotice} />
    </Switch>
  );
};

export default Board;
