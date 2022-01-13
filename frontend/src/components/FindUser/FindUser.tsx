import React, { useCallback, useEffect, useRef } from 'react';
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
  const { ModalPotal } = useModalPotal();

  //* MockData
  const userMockData = UsersData;
  // const usersNumber = userMockData.users.length;
  const usersRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const addToUsersRefs = useCallback(
    (el: HTMLButtonElement | null, ind: number) => {
      usersRefs.current[ind] = el;
      return usersRefs;
    },
    [usersRefs]
  );

  const clickInviteButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const refIndex: number = Number(e.currentTarget.id);

    usersRefs.current[refIndex]!.innerText =
      usersRefs.current[refIndex]?.innerText === '초대' ? '요청보냄' : '초대';
  };

  return (
    <ModalPotal>
      <div
        className={`relative p-5 rounded-md flex flex-col items-center z-20 bg-white ${styles.find__wrapper}`}
      >
        <div className="w-full mb-10">
          <Input size="large" width="80%" placeholder="검색" />
          <button className="ml-4 hover:scale-105" type="button">
            Cancel
          </button>
        </div>
        <ul className="w-full">
          {userMockData.users.map(({ nickname }, ind) => {
            return (
              <li
                key={v4()}
                className="w-full rounded-md mb-3 flex items-center justify-between hover:bg-gray-200 px-3 py-3"
              >
                <span>{nickname}</span>
                <Button
                  size="mini"
                  id={String(ind)}
                  ref={(e) => {
                    return addToUsersRefs(e, ind);
                  }}
                  color="#8b8bf5"
                  onClick={(e) => {
                    clickInviteButton(e);
                  }}
                >
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
