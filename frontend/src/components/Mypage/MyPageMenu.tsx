import React from 'react';
import { v4 } from 'uuid';
import { withRouter, useHistory } from 'react-router-dom';
import { FaChevronCircleRight } from 'react-icons/fa';

const MyPageMenu = () => {
  const menuTexts: { [key: string]: string } = {
    '/mypage': '내 정보 관리',
    '/mypage/changePassword': '비밀번호 변경',
  };

  const history = useHistory();

  const moveURL = (url: string) => {
    history.push(url);
  };

  return (
    <div className="col-span-1 w-full pt-5 flex justify-center border-r-2">
      <div className="">
        <ul>
          {Object.keys(menuTexts).map((url) => (
            <li
              key={v4()}
              className="mb-3 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            >
              <button
                type="button"
                className="flex flex-left items-center text-xl font-bold"
                onClick={() => moveURL(url)}
              >
                <FaChevronCircleRight color="#8b8bf5" className="mr-2" />
                {menuTexts[url]}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(MyPageMenu);
