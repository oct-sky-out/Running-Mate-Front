import { useEffect } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../modules';
import { SignInActions } from '../../modules/signIn';
import useModalPotal from '../../hooks/useModalPotal';
import Address from '../address/Address';
import axios from '../../lib/api/axios';

type Props = {
  token: string;
};

const MyPageInformations: React.FC<Props> = ({ token }) => {
  //* Redux
  const dispatch = useDispatch();
  const { email, nickname, address } = useSelector((state) => ({
    email: state.signIn.userData.email,
    nickname: state.signIn.userData.nickname,
    address: state.signIn.userData.address,
  }));

  //* Modal
  const { ModalPotal, closeModal, openModal } = useModalPotal();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userDataObj = JSON.parse(userData);
      dispatch(SignInActions.signInSuccess(userDataObj));
    }
  }, []);

  return (
    <>
      <div className="h-screen col-span-4 w-full pt-5 flex justify-center ">
        <div className="space-y-20">
          <div className="space-y-3">
            <span className="text-2xl">이메일</span>
            <span>{email}</span>
          </div>
          <div className="space-y-3">
            <span className="text-2xl">닉네임</span>
            <Input
              color="secondary"
              bordered
              type="text"
              width="100%"
              className="z-0"
              value={nickname}
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
              onClick={() => {
                axios
                  .post(
                    `/user`,
                    {
                      nickName: nickname,
                      address,
                    },
                    {
                      headers: {
                        'x-auth-token': token,
                      },
                    }
                  )
                  .then(() => {});
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
