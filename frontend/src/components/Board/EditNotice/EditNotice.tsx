import { RouteComponentProps } from 'react-router-dom';
import NoticeForm from '../NoticeForm/NoticeForm';

interface MatchParam {
  id: string;
}

const EditNotice: React.FC<RouteComponentProps<MatchParam>> = ({ match }) => (
  <NoticeForm formType="edit" id={match.params.id} />
);

export default EditNotice;
