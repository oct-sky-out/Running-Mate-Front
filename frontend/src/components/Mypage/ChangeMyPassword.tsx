import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import L from 'lodash';
import { Button, Input } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { useSelector } from '../../modules/index';
import { newPasswordActions } from '../../modules/newPassword';

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
  const [safePassword, setSafePassword] = useState(true);

  const changeNewPassword = useCallback(
    L.debounce((e: React.ChangeEvent<FormElement>) => {
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

      if (passwordRegex.test(e.target.value) && e.target.value.length >= 8) {
        setConfirmPassword('안전한 비밀번호입니다.');
        setSafePassword(true);
      }
      if (!passwordRegex.test(e.target.value) || e.target.value.length < 8) {
        setConfirmPassword(
          '비밀먼호 형식은 8자리 이상, 영어와 숫자, 특수기호(~!@#$%^&*)를 섞은 문자입니다.'
        );
        setSafePassword(false);
      }
      dispatch(newPasswordActions.setNewPassword(e.target.value));
    }, 500),
    [confirmPassword, safePassword]
  );
  const changeChekcNewPassword = useCallback(
    L.debounce((e: React.ChangeEvent<FormElement>) => {
      if (L.isEqual(newPassword, e.target.value)) {
        setSamePassword('같은 비밀번호입니다.');
      }
      if (!L.isEqual(newPassword, e.target.value)) {
        setSamePassword('비밀번호가 다릅니다.');
      }
      dispatch(newPasswordActions.setCheckNewPassword(e.target.value));
    }, 500),
    [newPassword, samePassword]
  );

  const isSame = useCallback(() => {
    if (safePassword && L.isEqual(newPassword, checkNewPassword)) {
      return false;
    }
    return true;
  }, [safePassword, newPassword, checkNewPassword]);
  return (
    <div className="h-screen col-span-4 w-full pt-20 border-r-2">
      <div className="w-2/3 flex flex-col items-center mx-auto my-0 space-y-20">
        <div className="w-2/3 flex flex-col justify-center">
          <Input.Password
            size="xlarge"
            data-testid="password"
            width="100%"
            placeholder="새로운 비밀번호"
            type="password"
            visibleIcon={<RiEyeLine fill="currentColor" />}
            hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
            onChange={changeNewPassword}
          />
          <span data-testid="password-confrim">{confirmPassword}</span>
        </div>
        <div className="w-2/3 flex flex-col justify-center">
          <Input.Password
            size="xlarge"
            data-testid="check-password"
            placeholder="비밀번호 확인"
            width="100%"
            type="password"
            visibleIcon={<RiEyeLine fill="currentColor" />}
            hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
            onChange={changeChekcNewPassword}
          />
          <span data-testid="password-same">{samePassword}</span>
        </div>
        <div className="">
          <Button
            size="xlarge"
            data-testid="check-password"
            placeholder="새로운 비밀번호"
            onChange={changeChekcNewPassword}
            disabled={isSame()}
          >
            변경
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeMyPassword;
