import { Input, Button } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SignInActions } from '../../modules/signIn';
import { useSelector } from '../../modules';

import styles from './SignInAndUpModal.module.css';
import { ReactComponent as KoreanLogo } from '../../assets/logo_korean.svg';

interface IProps {
  closeModal: () => void;
}

type SignUpActionType = 'setEmail' | 'setPassword';

const SignInModal: React.FC<IProps> = ({ closeModal }) => {
  //* Redux State
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => ({
    email: state.signIn.loginForm.email,
    password: state.signIn.loginForm.password,
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
      closeModal();
    },
    [email, password]
  );

  return (
    <>
      <div
        className={`relative p-5 rounded-md flex items-center z-20 bg-white ${styles.signIn_wrapper}`}
      >
        <div className="flex w-full ustify-center items-center flex-col">
          <div className="mb-5 border-b-2">
            <KoreanLogo />
          </div>
          <div className="mb-5">
            <span className="text-2xl">로그인</span>
          </div>
          <form onSubmit={signInExecuting}>
            <Input
              data-testid="email-input"
              width="100%"
              type="email"
              className="mb-5 z-0"
              placeholder="이메일"
              onChange={(e) => {
                changedInputs(e, 'setEmail');
              }}
            />
            <Input.Password
              data-testid="password-input"
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
                data-testid="login-button"
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
