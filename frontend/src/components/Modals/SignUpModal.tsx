import { Input, Button } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

import React, { useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SignUpActions } from '../../modules/signUp';
import { useSelector } from '../../modules';

import styles from './SignInModal.module.css';
import { ReactComponent as KoreanLogo } from '../../assets/logo_korean.svg';

interface IProps {
  closeModal: () => void;
}

type signUpActionType =
  | 'setEmail'
  | 'setNickname'
  | 'setName'
  | 'setPassword'
  | 'setCheckPassword'
  | 'setAdress';

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  //* Redux State
  const dispatch = useDispatch();
  const signUpState = useSelector((state) => {
    return state.signUp;
  });

  const changedInputs = useCallback(
    (
      { target: { value } }: React.ChangeEvent<FormElement>,
      actionName: signUpActionType
    ) => {
      dispatch(SignUpActions[actionName](value));
    },
    [signUpState]
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
            <span className="text-2xl">회원가입</span>
          </div>
          <form action="">
            <Input
              width="100%"
              className={`mb-5 z-0 ${styles.signIn_form}`}
              placeholder="이메일"
              onChange={(e) => {
                changedInputs(e, 'setEmail');
              }}
            />
            <Input
              width="100%"
              className={`mb-5 z-0 ${styles.signIn_form}`}
              placeholder="이름"
              onChange={(e) => {
                changedInputs(e, 'setNickname');
              }}
            />
            <Input
              width="100%"
              className={`mb-5 z-0 ${styles.signIn_form}`}
              placeholder="별명"
              onChange={(e) => {
                changedInputs(e, 'setName');
              }}
            />
            <Input.Password
              width="100%"
              className={`mb-5 z-0 ${styles.signIn_form}`}
              placeholder="비밀번호"
              visibleIcon={<RiEyeLine fill="currentColor" />}
              hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
              onChange={(e) => {
                changedInputs(e, 'setPassword');
              }}
            />
            <Input.Password
              width="100%"
              className={`mb-5 z-0 ${styles.signIn_form}`}
              placeholder="비밀번호 확인"
              visibleIcon={<RiEyeLine fill="currentColor" />}
              hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
              onChange={(e) => {
                changedInputs(e, 'setCheckPassword');
              }}
            />
            <div className="h-full flex justify-center align-center">
              <Button id={`${styles.signIn_btn}`} className="z-0 important">
                가입하기
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpModal;
