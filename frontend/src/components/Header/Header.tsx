import React, { useState, useEffect } from 'react';
import { useLocation, Link, withRouter, useHistory } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { ReactComponent as Logo } from '../../assets/logo_mini.svg';

const Header = () => {
  const location = useLocation();
  const history = useHistory();

  const [scrollBottomLine, setScrollBottomLine] = useState('');

  const moveHome = () => {
    history.push('/');
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 200) setScrollBottomLine('border-opacity-100');
    if (position < 200) setScrollBottomLine('border-opacity-0');
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (location.pathname === '/guest') {
    return null;
  }
  return (
    <div
      className={`w-full h-24 sticky top-0 bg-white transition duration-1000 border-b-2 border-purple  ${scrollBottomLine}`}
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
        <div className="flex-none flex w-32 items-center">
          <BiUser
            size="32"
            color="#8b8bf5"
            className="border-2 rounded-full border-purple cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);
