import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input, Button } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { SignInActions } from '../../modules/signIn';
import { useSelector } from '../../modules';
import styles from './SignInAndUpModal.module.css';
import { ReactComponent as MiniLogo } from '../../assets/logo_mini.svg';

interface IProps {
  closeModal: () => void;
}

type SignUpActionType = 'setEmail' | 'setPassword';

const SignInModal: React.FC<IProps> = ({ closeModal }) => {
  //* History of React Router
  const history = useHistory();
  //* Redux State
  const dispatch = useDispatch();
  const { email, password, error, userData } = useSelector((state) => ({
    email: state.signIn.loginForm.email,
    password: state.signIn.loginForm.password,
    error: state.signIn.error,
    userData: state.signIn.userData,
  }));

  //* useCallbacks
  const changedInputs = useCallback(
    (
      { target: { value } }: React.ChangeEvent<FormElement>,
      actionName: SignUpActionType
    ) => {
      dispatch(SignInActions[actionName](value));
    },
    [email, password]
  );

  const signInExecuting = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(SignInActions.signInFetch({ email, password }));
    },
    [email, password]
  );

  useEffect(() => {
    if (userData.userEmail !== '') {
      closeModal();
      history.push('/');
    }
    if (error.code !== '') {
      Swal.fire({
        icon: 'error',
        title: '에러 발생',
        text: `${error.code}`,
      });
    }
  }, [userData.userEmail, error.code]);

  return (
    <>
      <div
        className={`relative p-5 rounded-md flex items-center z-20 bg-white ${styles.signIn_wrapper}`}
      >
        <div className="flex w-full ustify-center items-center flex-col">
          <div className="w-3/4 mb-5 border-b-2 flex justify-center">
            <MiniLogo width="100" height="100" />
          </div>
          <div className="mb-5">
            <span className="text-2xl">로그인</span>
          </div>
          <form onSubmit={signInExecuting}>
            <Input
              width="100%"
              type="email"
              className="mb-5 z-0"
              placeholder="이메일"
              onChange={(e) => {
                changedInputs(e, 'setEmail');
              }}
            />
            <Input.Password
              width="100%"
              className="mb-5 z-0"
              placeholder="비밀번호"
              visibleIcon={<RiEyeLine fill="currentColor" />}
              hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
              onChange={(e) => {
                changedInputs(e, 'setPassword');
              }}
            />
            <div className="h-full flex justify-center align-center">
              <Button
                type="submit"
                id={`${styles.signIn_btn}`}
                className="z-0 important"
                disabled={!(email && password)}
              >
                로그인
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInModal;
