import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input, Button } from '@nextui-org/react';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { SignInActions } from '../../modules/signIn';
import { useSelector } from '../../modules';
import { ReactComponent as MiniLogo } from '../../assets/logo_mini.svg';
import useSwalerts from '../../common/hooks/useSwalerts';

interface IProps {
  closeModal: () => void;
}

const SignInModal: React.FC<IProps> = ({ closeModal }) => {
  //* History of React Router
  const history = useHistory();
  //* Redux State
  const dispatch = useDispatch();
  const { email, password, signInFetchStatus } = useSelector((state) => ({
    email: state.signIn.loginForm.email,
    password: state.signIn.loginForm.password,
    signInFetchStatus: state.signIn.signInFetchStatus,
  }));

  const { errorAlert } = useSwalerts();

  //* useCallbacks
  const signInExecuting = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(SignInActions.signInFetch({ email, password }));
    },
    [email, password]
  );

  useEffect(() => {
    if (signInFetchStatus === 'Success') {
      closeModal();
      dispatch(SignInActions.setInitError());
      history.push('/');
    }
    if (signInFetchStatus === 'Error') {
      errorAlert(
        '로그인 실패',
        '계정 혹은 비밀번호를 다시 한번 확인해주세요.'
      ).then(() => {
        dispatch(SignInActions.setInitError());
      });
    }
  }, [signInFetchStatus]);

  return (
    <>
      <div className="relative p-5 rounded-md flex items-center z-20 bg-white">
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
              label="이메일"
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
              label="비밀번호"
              visibleIcon={<RiEyeLine fill="currentColor" />}
              hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
              onChange={(e) => {
                dispatch(SignInActions.setPassword(e.target.value));
              }}
              data-cy="password"
            />
            <div className="h-full flex flex-col justify-center align-center">
              <Button
                auto
                rounded
                color="secondary"
                type="submit"
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
