import { useState, useEffect } from 'react';
import { useLocation, Link, withRouter, useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo_mini.svg';
import { useSelector } from '../../modules';
import SignInAndSignUpButtons from './SignInAndSignUpButtons';
import UserProfile from './UserProfile';

const Header = () => {
  //* react-router
  const location = useLocation();
  const history = useHistory();

  //* redux
  const isLogged = useSelector((state) => state.signIn.isLogged);

  //* useState
  const [scrollBottomLine, setScrollBottomLine] = useState('');

  //* Any Functions
  const moveHome = () => {
    history.push('/');
  };
  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 200) setScrollBottomLine('border-opacity-100');
    if (position < 200) setScrollBottomLine('');
  };

  //* useEffect
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //* URL Check
  if (location.pathname === '/guest') {
    return null;
  }
  return (
    <div className="z-2 w-screen h-16 md:h-24 sticky top-0 bg-white">
      <div
        className={`bg-white transition duration-1000 border-b-2 border-purple border-opacity-0 ${scrollBottomLine} px-3 flex w-full h-full items-center`}
      >
        <div className="w-full h-full space-x-4 flex items-center font-bold text-xs md:text-base lg:text-lg">
          <Logo
            width="80"
            height="80"
            className="cursor-pointer w-10 lg:w-24 md:w-14"
            onClick={moveHome}
          />
          <Link
            to="/"
            className={`${
              location.pathname === '/' ? 'text-purple' : 'hover:text-purple'
            }`}
          >
            <span>뛰어요</span>
          </Link>
          <Link
            to="/crewList"
            className={
              location.pathname === '/crewList'
                ? 'text-purple'
                : 'hover:text-purple'
            }
          >
            <span>모여요</span>
          </Link>
          <Link
            to="/talk"
            className={
              location.pathname === '/talk'
                ? 'text-purple'
                : 'hover:text-purple'
            }
          >
            <span>쑥떡쑥떡</span>
          </Link>
        </div>
        {isLogged ? <UserProfile /> : <SignInAndSignUpButtons />}
      </div>
    </div>
  );
};

export default Header;
