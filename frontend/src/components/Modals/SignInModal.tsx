import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input, Button } from '@nextui-org/react';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { SignInActions } from '../../modules/signIn';
import { useSelector } from '../../modules';
import styles from './SignInAndUpModal.module.css';
import { ReactComponent as MiniLogo } from '../../assets/logo_mini.svg';

interface IProps {
  closeModal: () => void;
}

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
  const signInExecuting = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(SignInActions.signInFetch({ email, password }));
    },
    [email, password]
  );

  useEffect(() => {
    if (userData.email !== '') {
      closeModal();
      history.push('/');
    }
    if (error.code === '500') {
      Swal.fire({
        icon: 'error',
        title: '로그인 실패',
        text: `${error.message}`,
      }).then(() => {
        dispatch(SignInActions.setInitError());
      });
    }
  }, [userData.email, error]);

  return (
    <>
      <div
        className={`relative p-5 rounded-md flex items-center z-20 bg-white ${styles.signIn_wrapper}`}
      >
        <div className="flex w-full ustify-center items-center flex-col">
          <div className="w-3/4 mb-5 border-b-2 flex justify-center">
            <MiniLogo width="100" height="100" />
          </div>
          <div className="mb-10">
            <span className="text-2xl">로그인</span>
          </div>
          <form onSubmit={signInExecuting} className="space-y-10">
            <Input
              color="secondary"
              bordered
              data-testid="email-input"
              width="100%"
              type="email"
              className="mb-5 z-0"
              labelPlaceholder="이메일"
              onChange={(e) => {
                dispatch(SignInActions.setEmail(e.target.value));
              }}
              data-cy="email"
            />
            <Input.Password
              color="secondary"
              bordered
              data-testid="password-input"
              width="100%"
              className="mb-5 z-0"
              labelPlaceholder="비밀번호"
              visibleIcon={<RiEyeLine fill="currentColor" />}
              hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
              onChange={(e) => {
                dispatch(SignInActions.setPassword(e.target.value));
              }}
              data-cy="password"
            />
            <div className="h-full flex justify-center align-center">
              <Button
                rounded
                color="secondary"
                type="submit"
                id={`${styles.signIn_btn}`}
                className="z-0 important"
                disabled={!(email && password)}
                data-cy="signIn-btn"
                data-testid="login-button"
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
