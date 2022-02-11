import { Switch, Route } from 'react-router-dom';
import CrewDetail from './CrewDetail/CrewDetail';
import CrewList from './CrewList/CrewList';

const CrewListPage = () => {
  return (
    <Switch>
      <Route exact path="/crewList" component={CrewList} />
      <Route path="/crewList/:id" component={CrewDetail} />
    </Switch>
  );
};

export default CrewListPage;
