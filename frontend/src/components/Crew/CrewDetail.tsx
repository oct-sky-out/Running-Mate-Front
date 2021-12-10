import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface MatchParam {
  id: string;
}

const CrewDetail: React.FC<RouteComponentProps<MatchParam>> = ({ match }) => {
  return <div data-testid="param">{match.params.id}</div>;
};

export default withRouter(CrewDetail);
