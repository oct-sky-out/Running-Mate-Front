import React from 'react';
import { Input, Button } from '@nextui-org/react';

interface IProps {
  closeModal: () => void;
}

const SignInModal: React.FC<IProps> = ({ closeModal }) => {
  return (
    <div>
      <div>
        <Input placeholder="ID" />
        <Input placeholder="이름" />
        <Input placeholder="별명" />
        <Input placeholder="비밀번호" />
        <Input placeholder="비밀번호 확인" />
        <Button>가입하기</Button>
      </div>
    </div>
  );
};

export default SignInModal;
