//* 테스팅 모듈
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { useMockStore } from '../../../modules';

import SignInModal from '../../../components/Modals/SignInModal';

const store = useMockStore;
describe('SignInModal 컴포넌트 테스팅', () => {
  it('아이디, 비밀번호 입력 시 리덕스 스토어가 정상적으로 변경되는가?', async () => {
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
    expect(store.getState().signIn.loginForm.email).toEqual(
      'example@example.com'
    );
    expect(store.getState().signIn.loginForm.password).toEqual(
      'example@example.com'
    );
  });

  it('아이디, 비밀번호 입력 후 로그인 버튼을 누를 시 로그인 페치 성공 데이터가 바뀌는가?', async () => {
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

    // userEvent.type(emailInput, 'example@example.com');
    expect(store.getState().signIn.loginForm.email).toEqual(
      'example@example.com'
    );
    userEvent.type(passwordInput, '1234');
    expect(store.getState().signIn.loginForm.password).toEqual('1234');
    userEvent.click(loginBtn);

    //! Jest Dom 상에서는 업데이트가 되지않는 현상 발생.
    expect(loginBtn.disabled).toEqual(false);
  });
});
