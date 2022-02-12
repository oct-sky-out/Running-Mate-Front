import { useHistory, useLocation } from 'react-router-dom';
import { v4 } from 'uuid';
import MenuButton from '../../../common/components/MenuButton';

interface IProps {
  menuTexts: { [key: string]: string };
}

const MyPageMenu: React.FC<IProps> = ({ menuTexts }) => {
  const history = useHistory();
  const location = useLocation();

  const moveURL = (url: string) => {
    history.push(url);
  };

  return (
    <div className="flex justify-center w-full">
      {Object.keys(menuTexts).map((url) => (
        <MenuButton
          key={v4()}
          type="button"
          className={`flex flex-left items-center text-sm sm:text-base md:text-xl font-bold mx-1 ${
            location.pathname === url ? 'border-purple' : null
          }`}
          onClick={() => moveURL(url)}
        >
          {menuTexts[url]}
        </MenuButton>
      ))}
    </div>
  );
};

export default MyPageMenu;
