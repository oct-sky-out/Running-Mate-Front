import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { SignUpActions } from '../../modules/signUp';
import { useSelector } from '../../modules';
import Address from '../address/Address';
import usePasswordCheck from '../../hooks/usePasswordCheck';
import styles from './SignInAndUpModal.module.css';
import { ReactComponent as MiniLogo } from '../../assets/logo_mini.svg';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
  closeModal: () => void;
}
type SignUpActionType =
  | 'setEmail'
  | 'setNickname'
  | 'setName'
  | 'setPassword'
  | 'setCheckPassword'
  | 'setAddress';

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  //* Redux State
  const dispatch = useDispatch();
  const {
    email,
    nickname,
    name,
    password,
    checkPassword,
    address,
    success,
    error,
  } = useSelector((state) => ({
    email: state.signUp.email,
    nickname: state.signUp.nickname,
    name: state.signUp.name,
    password: state.signUp.password,
    checkPassword: state.signUp.checkPassword,
    address: state.signUp.address,
    success: state.signUp.success,
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
          nickname,
          name,
          password,
          address,
          signUpFetchState: 'Fetch',
        })
      );
    },
    [email, nickname, name, password, checkPassword, address]
  );

  const changedInputs = useCallback(
    (
      { target: { value } }: React.ChangeEvent<FormElement>,
      actionName: SignUpActionType
    ) => {
      dispatch(SignUpActions[actionName](value));
    },
    [email, nickname, name, address]
  );

  useEffect(() => {
    if (success.nickName !== '') {
      closeModal();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '회원가입 완료되었습니다.',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (error.code !== '') {
      Swal.fire({
        icon: 'error',
        title: '에러 발생',
        text: `${error.code}`,
      });
    }
  }, [success.nickName, error.code]);

  return (
    <>
      <div
        className={`relative p-5 rounded-md flex items-center z-20 bg-white ${styles.signUp_wrapper}`}
      >
        <div className="flex w-full justify-center items-center flex-col">
          <div className="w-3/4 mb-5 border-b-2 flex justify-center">
            <MiniLogo width="100" height="100" />
          </div>
          <div className="mb-5">
            <span className="text-2xl">회원가입</span>
          </div>
          <form onSubmit={signUpExecuting}>
            <Input
              width="100%"
              className={`mb-5 z-0 ${styles.signIn_form}`}
              placeholder="이메일"
              type="email"
              onChange={(e) => {
                changedInputs(e, 'setEmail');
              }}
            />
            <Input
              width="100%"
              className={`mb-5 z-0 ${styles.signIn_form}`}
              placeholder="이름"
              onChange={(e) => {
                changedInputs(e, 'setName');
              }}
            />
            <Input
              width="100%"
              className={`mb-5 z-0 ${styles.signIn_form}`}
              placeholder="별명"
              onChange={(e) => {
                changedInputs(e, 'setNickname');
              }}
            />
            <div className="flex mb-5 items-center space-x-2 justify-between">
              <Input
                disabled
                width="100%"
                className={` z-0 ${styles.signIn_form}`}
                placeholder="주소 (시/도, 시/군/구 까지만 입력) "
                value={address}
              />
              <Button
                className=""
                onClick={() => {
                  setOpenAddressModal(true);
                }}
              >
                주소 검색
              </Button>
            </div>
            <div className="flex flex-col justify-center">
              <Input.Password
                width="100%"
                className={`mb-2 z-0 ${styles.signIn_form}`}
                placeholder="비밀번호"
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
                width="100%"
                className={`mb-2 z-0 ${styles.signIn_form}`}
                placeholder="비밀번호 확인"
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
            <div className="h-full flex justify-center align-center">
              <Button
                type="submit"
                id={`${styles.signIn_btn}`}
                className="z-0 important"
                disabled={
                  !(
                    isSafedAndPasswordSame(password, checkPassword) &&
                    email &&
                    nickname &&
                    name &&
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
          <div className="z-10 w-full h-full absolute top-0 left-0">
            <Address setOpenAddressModal={setOpenAddressModal} />
          </div>
        )}
      </div>
    </>
  );
};

export default SignUpModal;
