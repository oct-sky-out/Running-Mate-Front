import React, { useEffect } from 'react';
import { Input, Button } from '@nextui-org/react';
import { v4 } from 'uuid';
import styles from './FindUser.module.css';
import useModalPotal from '../../hooks/useModalPotal';

import UsersData from '../../excuteData/UsersMock/UsersMock';

interface IProps {
  closeModal: () => void;
}

const FindUser: React.FC<IProps> = ({ closeModal }) => {
  //* Modal
  const { ModalPotal, openModal } = useModalPotal();
  const userMockData = UsersData;

  useEffect(() => {
    openModal();
  }, []);
  return (
    <ModalPotal>
      <div
        className={`relative p-5 rounded-md flex flex-col items-center z-20 bg-white ${styles.find__wrapper}`}
      >
        <div className="w-full mb-10">
          <Input size="large" width="80%" placeholder="검색" />
          <button className="ml-4" type="button">
            Cancel
          </button>
        </div>
        <ul className="w-full">
          {userMockData.users.map(({ nickname }) => {
            return (
              <li
                key={v4()}
                className="w-full rounded-md mb-3 flex items-center justify-between w-3/4 hover:bg-gray-200 px-3 py-3"
              >
                <span>{nickname}</span>

                <Button size="mini" color="#8b8bf5">
                  초대
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </ModalPotal>
  );
};

export default FindUser;
