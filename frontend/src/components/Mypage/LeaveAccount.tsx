import { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useSelector } from '../../modules';
import axios from '../../lib/api/axios';

const LeaveAccount = () => {
  const { email, nickname, token } = useSelector((state) => ({
    email: state.signIn.userData.email,
    nickname: state.signIn.userData.nickname,
    token: state.signIn.token,
  }));
  const [confirmEmail, setConfirmEmail] = useState('');

  return (
    <div className="h-screen col-span-4 w-full pt-20">
      <div className="w-2/3 flex flex-col items-center mx-auto my-0 space-y-20">
        <span className="text-2xl font-bold">
          사용하고계신 계정을 입력해주세요.
        </span>
        <div className="w-2/3 flex flex-col justify-center">
          <Input
            bordered
            color="secondary"
            size="xlarge"
            width="100%"
            labelPlaceholder="계정확인"
            type="email"
            value={confirmEmail}
            onChange={(e) => {
              setConfirmEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <Button
            rounded
            color="secondary"
            size="xlarge"
            disabled={!(email === confirmEmail)}
            onClick={async () => {
              await axios.delete(`/user/delete`, {
                headers: { 'X-AUTH-PATH': token },
              });
            }}
          >
            회원탈퇴
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaveAccount;
