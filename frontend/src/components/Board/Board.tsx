import { Switch, Route } from 'react-router-dom';
import CreateNotice from './CreateNotice/CreateNotice';
import EditNotice from './EditNotice/EditNotice';
import ViewNotice from './ViewNotice/ViewNotice';

const Board = () => {
  return (
    <Switch>
      <Route exact path="/boards/run/:runId" component={ViewNotice} />
      <Route exact path="/boards/edit/run/:id" component={EditNotice} />
      <Route exact path="/boards/create/run" component={CreateNotice} />
    </Switch>
  );
};

export default Board;
