import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import { useSelector } from '../../../modules';
import UserService from '../../../lib/api/userService';
import useSwalerts from '../../../common/hooks/useSwalerts';

const LeaveAccount = () => {
  const history = useHistory();
  const { email, nickname, token } = useSelector((state) => ({
    email: state.signIn.userData.email,
    nickname: state.signIn.userData.nickName,
    token: state.signIn.token,
  }));

  const [confirmEmail, setConfirmEmail] = useState('');
  const { errorAlert, successAlert } = useSwalerts();

  const clickLeaveAccountButton = async () => {
    try {
      const { message } = await new UserService().leaveAccount(token, nickname);
      await successAlert(
        message,
        '삭제를 완료했습니다.',
        '게스트 페이지로 돌아가기'
      );
      history.push('/guest');
    } catch (err: any) {
      errorAlert('삭제 실패', '삭제에 실패하였습니다. 죄송합니다.😰');
    }
  };

  return (
    <div className="h-screen col-span-4 w-full pt-20">
      <div className="w-2/3 flex flex-col items-center mx-auto my-0 space-y-20">
        <span className="text-2xl font-bold">
          사용하고 계신 계정을 입력해주세요.
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
        <Button
          rounded
          color="secondary"
          size="xlarge"
          disabled={!(email === confirmEmail)}
          onClick={() => {}}
        >
          회원탈퇴
        </Button>
        <div>
          <Button
            rounded
            color="secondary"
            size="xlarge"
            disabled={!(email === confirmEmail)}
            onClick={clickLeaveAccountButton}
          >
            회원탈퇴
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaveAccount;
