import {
  withRouter,
  useLocation,
  useParams,
  useHistory,
} from 'react-router-dom';
import { v4 } from 'uuid';
import MenuButton from '../../../common/components/MenuButton';

const CrewManagementMenu = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const history = useHistory();

  const menuTexts = {
    [`/crew/${id}/management`]: '크루 정보관리',
    [`/crew/${id}/peoplemanagement`]: '크루원 관리',
    [`/crew/${id}/requestmanagement`]: '크루가입 요청내역',
    [`/crew/${id}/delete`]: '크루 제거',
  };

  return (
    <div className="flex justify-center w-full my-10">
      {Object.keys(menuTexts).map((url) => (
        <MenuButton
          key={v4()}
          type="button"
          className={`flex flex-left items-center text-xl font-bold px-3 md:px-5 md:py-4 ${
            location.pathname === url && 'border-purple'
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
