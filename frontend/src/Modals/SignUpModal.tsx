import React from 'react';
import { Input, Button } from '@nextui-org/react';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import styles from './SignInModal.module.css';
import { ReactComponent as KoreanLogo } from '../assets/logo_korean.svg';

interface IProps {
  closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
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
          <Input
            width="100%"
            className={`mb-5 z-0 ${styles.signIn_form}`}
            placeholder="이메일"
          />
          <Input
            width="100%"
            className={`mb-5 z-0 ${styles.signIn_form}`}
            placeholder="이름"
          />
          <Input
            width="100%"
            className={`mb-5 z-0 ${styles.signIn_form}`}
            placeholder="별명"
          />
          <Input.Password
            width="100%"
            className={`mb-5 z-0 ${styles.signIn_form}`}
            placeholder="비밀번호"
            visibleIcon={<RiEyeLine fill="currentColor" />}
            hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
          />
          <Input.Password
            width="100%"
            className={`mb-5 z-0 ${styles.signIn_form}`}
            placeholder="비밀번호 확인"
            visibleIcon={<RiEyeLine fill="currentColor" />}
            hiddenIcon={<RiEyeCloseLine fill="currentColor" />}
          />
          <div className="h-full flex justify-center align-center">
            <Button id={`${styles.signIn_btn}`} className="z-0 important">
              가입하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpModal;
