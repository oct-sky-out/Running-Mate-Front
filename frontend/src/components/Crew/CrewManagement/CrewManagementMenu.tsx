import {
  withRouter,
  useLocation,
  useParams,
  useHistory,
} from 'react-router-dom';
import MenuButton from '../../../common/components/MenuButton';

const CrewManagementMenu = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const history = useHistory();

  const menuTexts = {
    [`/crew/${id}/management`]: '크루 정보관리',
    [`/crew/${id}/peopleManagement`]: '크루원 관리',
  };

  return (
    <div className="flex justify-center w-full my-10">
      {Object.keys(menuTexts).map((url) => (
        <MenuButton
          type="button"
          className={`flex flex-left items-center text-xl font-bold ${
            location.pathname === url ? 'border-purple' : null
          }`}
          onClick={() => history.push(url)}
        >
          {menuTexts[url]}
        </MenuButton>
      ))}
    </div>
  );
};

export default withRouter(CrewManagementMenu);
