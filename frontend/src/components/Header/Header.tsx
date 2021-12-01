import { useState, useEffect } from 'react';
import { useLocation, Link, withRouter, useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo_mini.svg';
import UserProfile from './UserProfile';

const Header = () => {
  //* react-router
  const location = useLocation();
  const history = useHistory();

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
    <div
      className={`w-full h-24 sticky top-0 bg-white transition duration-1000 border-b-2 border-purple border-opacity-0 ${scrollBottomLine}`}
    >
      <div className="flex w-full h-full mx-5">
        <div className="w-full space-x-4 flex items-center font-bold">
          <Logo
            width="80"
            height="80"
            className="cursor-pointer"
            onClick={moveHome}
          />
          <Link
            to="/"
            className={
              location.pathname === '/' ? 'text-purple' : 'hover:text-purple'
            }
          >
            <span>뛰어요</span>
          </Link>
          <Link
            to="/crew"
            className={
              location.pathname === '/crew'
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
        <UserProfile />
      </div>
    </div>
  );
};

export default withRouter(Header);
