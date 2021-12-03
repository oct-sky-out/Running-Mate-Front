import React, { useCallback } from 'react';
import { Button, Input } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../modules';
import { SignInActions } from '../../modules/signIn';
import useModalPotal from '../../hooks/useModalPotal';
import Address from '../address/Address';

const MyPageInformations = () => {
  //* Redux
  const dispatch = useDispatch();
  const { email, nickname, address } = useSelector((state) => ({
    email: state.signIn.userData.email,
    nickname: state.signIn.userData.nickname,
    address: state.signIn.userData.address,
  }));

  //* Modal
  const { ModalPotal, closeModal, openModal, getActiveModalState } =
    useModalPotal();

  //* Event
  const changedUserData = useCallback(
    ({ target: { value } }: React.ChangeEvent<FormElement>) => {
      console.log(nickname, value);
      dispatch(SignInActions.setUserNicknameData(nickname + value));
    },
    [nickname]
  );

  return (
    <>
      <div className="h-screen col-span-4 w-full pt-5 flex justify-center border-r-2">
        <div className="space-y-20">
          <div className="space-y-3">
            <span className="text-2xl">이메일</span>
            <span>{email}</span>
          </div>
          <div className="space-y-3">
            <span className="text-2xl">닉네임</span>
            <Input
              type="text"
              width="100%"
              className="z-0"
              placeholder="변경할 닉네임"
              onChange={(e) => {
                changedUserData(e);
              }}
            />
          </div>
          <div className="space-y-3">
            <span className="text-2xl">회원주소</span>
            <Input
              disabled
              width="100%"
              className="z-0"
              placeholder="주소 (시/도, 시/군/구 까지만 입력) "
              value={address}
            />
            <Button
              className="z-0"
              onClick={() => {
                openModal();
              }}
            >
              주소 검색
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <Button className="z-0" onClick={() => {}}>
              저장하기
            </Button>
          </div>
        </div>
      </div>
      <ModalPotal>
        <div className="z-30 w-1/3 h-1/2">
          <Address closeModal={closeModal} />
        </div>
      </ModalPotal>
    </>
  );
};

export default MyPageInformations;
