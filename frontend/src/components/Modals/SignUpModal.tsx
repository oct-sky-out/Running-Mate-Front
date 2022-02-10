import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { GrClose } from 'react-icons/gr';
import Swal from 'sweetalert2';
import { SignUpActions } from '../../modules/signUp';
import { useSelector } from '../../modules';
import Address from '../address/Address';
import usePasswordCheck from '../../hooks/usePasswordCheck';
import { ReactComponent as MiniLogo } from '../../assets/logo_mini.svg';

interface IProps {
  closeModal: () => void;
}
type SignUpActionType =
  | 'setEmail'
  | 'setNickname'
  | 'setPassword'
  | 'setCheckPassword'
  | 'setAddress';

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  //* Redux State
  const dispatch = useDispatch();
  const {
    email,
    nickName,
    password,
    checkPassword,
    address,
    fetchState,
    error,
  } = useSelector((state) => ({
    email: state.signUp.email,
    nickName: state.signUp.nickname,
    password: state.signUp.password,
    checkPassword: state.signUp.checkPassword,
    address: state.signUp.address,
    fetchState: state.signUp.signUpFetchState,
    error: state.signUp.error,
  }));

  const {
    changeChekcPassword,
    changePassword,
    isSafedAndPasswordSame,
    getConfirmPasswordState,
    getSamePasswordState,
  } = usePasswordCheck();

  //* useStates
  const [openAddressModal, setOpenAddressModal] = useState(false);

  //* useCallbacks
  const signUpExecuting = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(
        SignUpActions.signUpFetch({
          email,
          nickName,
          password,
          address,
          signUpFetchState: 'Fetch',
        })
      );
    },
    [email, nickName, password, checkPassword, address]
  );

  const changedInputs = useCallback(
    (
      { target: { value } }: React.ChangeEvent<FormElement>,
      actionName: SignUpActionType
    ) => {
      dispatch(SignUpActions[actionName](value));
    },
    [email, nickName, address]
  );
  const closeAddressModal = () => {
    setOpenAddressModal(false);
  };
  useEffect(() => {
    if (fetchState === 'Success') {
      closeModal();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '회원가입이 완료되었습니다.',
        text: '로그인하고 서비스를 이용해보세요!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        dispatch(SignUpActions.setInit());
      });
    }
    if (fetchState === 'Error') {
      Swal.fire({
        icon: 'error',
        title: '에러 발생',
        text: `${error.code}`,
      }).then(() => {
        dispatch(SignUpActions.setSignUpState());
      });
    }
  }, [fetchState, error.code]);

  return (
    <>
      <div className="w-500 h-500 md:h-700 relative p-5 mx-3 rounded-md z-20 bg-white overflow-y-scroll">
        <div className="my-auto md:h-600">
          <div className="w-3/4 mx-auto border-b-2 flex justify-center">
            <MiniLogo className="w-10 h-10 md:w-24 md:h-24" />
          </div>
          <div className="">
            <span className="w-24 block text-2xl mx-auto">회원가입</span>
          </div>
          <form onSubmit={signUpExecuting} className="space-y-2 md:space-y-5">
            <Input
              color="secondary"
              bordered
              width="100%"
              className="z-0"
              label="이메일"
              type="email"
              onChange={(e) => {
                changedInputs(e, 'setEmail');
              }}
            />
            <Input
              color="secondary"
              bordered
              width="100%"
              className="z-0"
              label="별명"
              onChange={(e) => {
                changedInputs(e, 'setNickname');
              }}
            />
            <div className="flex items-center space-x-2 justify-between">
              <Input
                color="secondary"
                bordered
                disabled
                width="100%"
                className="z-0"
                label="주소 (시/도, 시/군/구 까지만 입력) "
                value={address}
              />
              <Button
                auto
                className="mt-7"
                rounded
                color="secondary"
                onClick={() => {
                  setOpenAddressModal(true);
                }}
              >
                주소 검색
              </Button>
            </div>
            <div className="flex flex-col justify-center">
              <Input.Password
                color="secondary"
                bordered
                width="100%"
                className="mb-2 z-0"
                label="비밀번호"
                visibleIcon={<RiEyeLine fill="currentColor" />}
                hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
                onChange={(e) =>
                  changePassword(e, () =>
                    dispatch(SignUpActions.setPassword(e.target.value))
                  )
                }
              />
              <span className="mb-2 pl-2 text-xs text-gray-500">
                {getConfirmPasswordState()}
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <Input.Password
                color="secondary"
                bordered
                width="100%"
                className="mb-2 z-0"
                label="비밀번호 확인"
                visibleIcon={<RiEyeLine fill="currentColor" />}
                hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
                onChange={(e) => {
                  changeChekcPassword(e, password, () =>
                    dispatch(SignUpActions.setCheckPassword(e.target.value))
                  );
                }}
              />
              <span className="mb-2 pl-2 text-xs text-gray-500">
                {getSamePasswordState()}
              </span>
            </div>
            <div className="h-full flex flex-col justify-center align-center">
              <Button
                auto
                color="secondary"
                rounded
                type="submit"
                className="z-0 important"
                disabled={
                  !(
                    isSafedAndPasswordSame(password, checkPassword) &&
                    email &&
                    nickName &&
                    address
                  )
                }
              >
                가입하기
              </Button>
            </div>
          </form>
        </div>
        {openAddressModal && (
          <div className="z-10 w-full h-full absolute top-7 left-0">
            <Address setOpenAddressModal={setOpenAddressModal} />
            <div className="absolute left-3 -top-5 md:-top-5">
              <GrClose
                className="cursor-pointer text-2xl md:text-3xl"
                onClick={closeAddressModal}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignUpModal;
