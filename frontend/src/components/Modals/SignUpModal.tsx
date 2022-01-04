import React, { useState, useCallback, useEffect } from 'react';
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
  | 'setPassword'
  | 'setCheckPassword'
  | 'setAddress';

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  //* Redux State
  const dispatch = useDispatch();
  const {
    email,
    nickname,
    password,
    checkPassword,
    address,
    fetchState,
    error,
  } = useSelector((state) => ({
    email: state.signUp.email,
    nickname: state.signUp.nickname,
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
          nickname,
          password,
          address,
          signUpFetchState: 'Fetch',
        })
      );
    },
    [email, nickname, password, checkPassword, address]
  );

  const changedInputs = useCallback(
    (
      { target: { value } }: React.ChangeEvent<FormElement>,
      actionName: SignUpActionType
    ) => {
      dispatch(SignUpActions[actionName](value));
    },
    [email, nickname, address]
  );

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
      <div className="relative p-5 rounded-md flex items-center z-20 bg-white h-11/12 overflow-y-scroll">
        <div className="flex w-full justify-center items-center flex-col">
          <div className="w-3/4 mb-5 border-b-2 flex justify-center">
            <MiniLogo width="100" height="100" />
          </div>
          <div className="mb-10">
            <span className="text-2xl">회원가입</span>
          </div>
          <form onSubmit={signUpExecuting} className="space-y-10">
            <Input
              color="secondary"
              bordered
              width="100%"
              className={`mb-5 z-0 ${styles.signIn_form}`}
              labelPlaceholder="이메일"
              type="email"
              onChange={(e) => {
                changedInputs(e, 'setEmail');
              }}
            />
            <Input
              color="secondary"
              bordered
              width="100%"
              className={`mb-5 z-0 ${styles.signIn_form}`}
              labelPlaceholder="별명"
              onChange={(e) => {
                changedInputs(e, 'setNickname');
              }}
            />
            <div className="flex mb-5 items-center space-x-2 justify-between">
              <Input
                color="secondary"
                bordered
                disabled
                width="100%"
                className={`z-0 ${styles.signIn_form}`}
                labelPlaceholder="주소 (시/도, 시/군/구 까지만 입력) "
                value={address}
              />
              <Button
                auto
                className="grow-0"
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
                className={`mb-2 z-0 ${styles.signIn_form}`}
                labelPlaceholder="비밀번호"
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
                className={`mb-2 z-0 ${styles.signIn_form}`}
                labelPlaceholder="비밀번호 확인"
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
                color="secondary"
                rounded
                type="submit"
                id={`${styles.signIn_btn}`}
                className="z-0 important"
                disabled={
                  !(
                    isSafedAndPasswordSame(password, checkPassword) &&
                    email &&
                    nickname &&
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
