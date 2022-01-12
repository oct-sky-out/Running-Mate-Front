import { useEffect } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../modules';
import { SignInActions } from '../../modules/signIn';
import useModalPotal from '../../hooks/useModalPotal';
import Address from '../address/Address';
import UserService from '../../lib/api/userService';

type Props = {
  token: string;
};

const MyPageInformations: React.FC<Props> = ({ token }) => {
  //* API Service
  const userService = new UserService();

  //* Redux
  const dispatch = useDispatch();
  const { email, nickName, address } = useSelector((state) => ({
    email: state.signIn.userData.email,
    nickName: state.signIn.userData.nickName,
    address: state.signIn.userData.address,
  }));

  //* Modal
  const { ModalPotal, closeModal, openModal } = useModalPotal();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userDataObj = JSON.parse(userData);
      delete userDataObj.regDate;
      delete userDataObj.roles;
      dispatch(SignInActions.signInSuccess(userDataObj));
    }
  }, []);
  return (
    <>
      <div className="h-screen col-span-4 w-full pt-5 flex justify-center ">
        <div className="space-y-20">
          <div className="space-y-3">
            <span className="text-2xl mb-3">이메일</span>
            <span className="block ml-2 w-auto pb-2 border-b-2 border-gray-200 text-gray-400">
              {email}
            </span>
          </div>
          <div className="space-y-3">
            <span className="text-2xl">닉네임</span>
            <Input
              color="secondary"
              bordered
              type="text"
              width="100%"
              className="z-0"
              value={nickName}
              placeholder="변경할 닉네임"
              onChange={(e) => {
                dispatch(SignInActions.setUserNicknameData(e.target.value));
              }}
            />
          </div>
          <div className="space-y-3">
            <span className="text-2xl">회원주소</span>
            <Input
              color="secondary"
              bordered
              disabled
              width="100%"
              className="z-0"
              placeholder="주소 (시/도, 시/군/구 까지만 입력) "
              value={address}
            />
            <Button
              color="secondary"
              rounded
              className="z-0"
              onClick={() => {
                openModal();
              }}
            >
              주소 검색
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <Button
              rounded
              color="secondary"
              className="z-0"
              onClick={async () => {
                await userService.editMyPageData({ nickName, address, token });
                await userService.getMyPageData(token);
              }}
            >
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
