//* 테스팅 모듈
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import {
  useDispatchMock,
  useSelectorMock,
  mockStore,
} from '../../../__mocks__/reduxMock/storeMock';
import { useMockStore } from '../../../modules';

//* 리액트 모듈
import { Input, Button } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SignInActions } from '../../../modules/signIn';
import { useSelector } from '../../../modules';

import styles from './SignAndUpModal.module.css';
import { ReactComponent as KoreanLogo } from '../../../assets/logo_korean.svg';

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
      console.log(email, password, actionName);
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
              className={`mb-5 z-0`}
              placeholder="이메일"
              onChange={(e) => {
                changedInputs(e, 'setEmail');
              }}
            />
            <Input.Password
              data-testid="password-input"
              width="100%"
              className={`mb-5 z-0`}
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

describe('SignInModal 컴포넌트 테스팅', () => {
  const store = useMockStore;
  beforeEach(() => {
    const dispatchMock = useDispatchMock;
    store.dispatch = dispatchMock;
    useSelectorMock.mockImplementation((selector) => selector(mockStore));
  });
  test('아이디, 비밀번호 입력 시 리덕스 스토어가 정상적으로 변경되는가?', async () => {
    render(
      <Provider store={store}>
        <SignInModal closeModal={jest.fn} />
      </Provider>
    );
    const emailInput = (await screen.findByTestId(
      'email-input'
    )) as HTMLInputElement;
    const passwordInput = (await screen.findByTestId(
      'password-input'
    )) as HTMLInputElement;

    userEvent.type(emailInput, 'example@example.com');
    userEvent.type(passwordInput, 'example@example.com');

    expect(emailInput.value).toEqual('example@example.com');
  });
  test('아이디, 비밀번호 입력 후 로그인 버튼을 누를 시 로그인 페치 성공 데이터가 바뀌는가?', async () => {
    render(
      <Provider store={store}>
        <SignInModal closeModal={jest.fn} />
      </Provider>
    );
    const emailInput = (await screen.findByTestId(
      'email-input'
    )) as HTMLInputElement;
    const passwordInput = (await screen.findByTestId(
      'password-input'
    )) as HTMLInputElement;
    const loginBtn = (await screen.findByTestId(
      'login-button'
    )) as HTMLButtonElement;

    userEvent.type(emailInput, 'example@example.com');
    userEvent.type(passwordInput, '1234');
    userEvent.click(loginBtn);

    //! Jest Dom 상에서는 업데이트가 되지않는 현상 발생.
    expect(store.getState().signIn.loginForm.email).toEqual(
      'example@example.com'
    );
    expect(store.getState().signIn.loginForm.password).toEqual('1234');
    expect(loginBtn.disabled).toEqual(false);
    expect(
      useDispatchMock.mock.calls[useDispatchMock.mock.calls.length - 1][0].type
    ).toEqual('signIn/signInFetch');
  });
});
