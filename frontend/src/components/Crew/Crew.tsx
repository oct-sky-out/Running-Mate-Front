import { Route, Switch } from 'react-router-dom';
import DetailBaseBorder from '../../common/components/DetailBaseBorder';
import CrewDetail from './CreateCrew/CreateCrew';
import CrewManagement from './CrewManagement/CrewManagement';

const Crew = () => {
  return (
    <DetailBaseBorder>
      <Switch>
        <Route path="/crew/new" component={CrewDetail} />
        <Route path="/crew/:id" component={CrewManagement} />
      </Switch>
    </DetailBaseBorder>
  );
};

export default Crew;
