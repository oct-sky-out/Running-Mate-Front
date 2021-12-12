/**
 * @jest-environment jsdom
 */

//* 테스팅 모듈
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { useMockStore } from '../../../modules';
import '@testing-library/jest-dom';
import { Input } from '@nextui-org/react';

//* 컴포넌트 모듈
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import L from 'lodash';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { useSelector } from '../../../modules/index';
import { newPasswordActions } from '../../../modules/newPassword';

const ChangeMyPassword = () => {
  const dispatch = useDispatch();
  const { newPassword, checkNewPassword } = useSelector((state) => ({
    newPassword: state.newPassword.newPassword,
    checkNewPassword: state.newPassword.checkNewPassword,
  }));

  const [confirmPassword, setConfirmPassword] = useState(
    '비밀먼호 형식은 8자리 이상, 영어와 숫자, 특수기호(~!@#$%^&*)를 섞은 문자입니다.'
  );
  const [samePassword, setSamePassword] = useState('');

  const changeNewPassword = useCallback(
    (e: React.ChangeEvent<FormElement>) => {
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

      if (passwordRegex.test(e.target.value) && e.target.value.length >= 8) {
        setConfirmPassword('안전한 비밀번호입니다.');
        dispatch(newPasswordActions.setNewPassword(e.target.value));
      }
      if (!passwordRegex.test(e.target.value) || e.target.value.length < 8)
        setConfirmPassword(
          '비밀먼호 형식은 8자리 이상, 영어와 숫자, 특수기호(~!@#$%^&*)를 섞은 문자입니다.'
        );
    },
    [confirmPassword]
  );
  const changeChekcNewPassword = useCallback(
    (e: React.ChangeEvent<FormElement>) => {
      if (L.isEqual(newPassword, e.target.value)) {
        setSamePassword('같은 비밀번호입니다.');
        dispatch(newPasswordActions.setNewPassword(e.target.value));
      }
      if (!L.isEqual(newPassword, e.target.value))
        setSamePassword('비밀번호가 다릅니다.');
    },
    [checkNewPassword]
  );

  return (
    <div>
      <div>
        <Input.Password
          data-testid="password"
          placeholder="새로운 비밀번호"
          type="password"
          visibleIcon={<RiEyeLine fill="currentColor" />}
          hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
          onChange={changeNewPassword}
        />
        <span data-testid="password-confrim">{confirmPassword}</span>
      </div>
      <div>
        <Input.Password
          data-testid="check-password"
          placeholder="새로운 비밀번호"
          type="password"
          visibleIcon={<RiEyeLine fill="currentColor" />}
          hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
          onChange={changeChekcNewPassword}
        />
        <span data-testid="password-same">{samePassword}</span>
      </div>
    </div>
  );
};

describe('비밀번호 변경 컴포넌트 테스팅', () => {
  test('비밀번호가 안전한 비밀번호인가?', async () => {
    render(
      <Provider store={useMockStore}>
        <ChangeMyPassword />
      </Provider>
    );

    const passwordInput = (await screen.findByTestId(
      'password'
    )) as HTMLInputElement;
    const passwordConfirmText = (await screen.findByTestId(
      'password-confrim'
    )) as HTMLSpanElement;

    userEvent.type(passwordInput, 'example21123');
    expect(passwordConfirmText.textContent).toBe(
      '비밀먼호 형식은 8자리 이상, 영어와 숫자, 특수기호(~!@#$%^&*)를 섞은 문자입니다.'
    );

    passwordInput.value = '';
    userEvent.type(passwordInput, 'exam1!');
    expect(passwordConfirmText.textContent).toBe(
      '비밀먼호 형식은 8자리 이상, 영어와 숫자, 특수기호(~!@#$%^&*)를 섞은 문자입니다.'
    );

    passwordInput.value = '';
    userEvent.type(passwordInput, 'example123!@');
    expect(passwordConfirmText.textContent).toBe('안전한 비밀번호입니다.');
  });

  test('비밀번호가 안전하고, 확인 비밀번호와 동일한가?', async () => {
    render(
      <Provider store={useMockStore}>
        <ChangeMyPassword />
      </Provider>
    );

    const passwordInput = (await screen.findByTestId(
      'password'
    )) as HTMLInputElement;
    const checkPasswordInput = (await screen.findByTestId(
      'check-password'
    )) as HTMLInputElement;
    const passwordConfirmText = (await screen.findByTestId(
      'password-confrim'
    )) as HTMLSpanElement;
    const samePssswordText = (await screen.findByTestId(
      'password-same'
    )) as HTMLSpanElement;

    userEvent.type(passwordInput, 'example123!@');
    expect(passwordConfirmText.textContent).toBe('안전한 비밀번호입니다.');

    expect(samePssswordText.textContent).toBe('');

    userEvent.type(checkPasswordInput, 'example');
    expect(samePssswordText.textContent).toBe('비밀번호가 다릅니다.');

    checkPasswordInput.value = '';
    userEvent.type(checkPasswordInput, 'example123!@');
    expect(samePssswordText.textContent).toBe('같은 비밀번호입니다.');
  });
});
