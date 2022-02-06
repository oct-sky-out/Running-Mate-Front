import { Button } from '@nextui-org/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import CrewService from '../../../lib/api/crewService';
import { useSelector } from '../../../modules';

const LeaveCrewButton = () => {
  const { userNickName } = useSelector((state) => ({
    userNickName: state.signIn.userData.nickName,
  }));

  const [isLeaved, setIsLeaved] = useState(false);

  const clickLeaveCrewButton = async () => {
    try {
      // 리덕스 사가 처리해야함. 탈퇴 후 유저 정보 재조회(새로고침)필요.
      const { message } = await new CrewService().leaveCrew(userNickName);
      Swal.fire({
        toast: true,
        icon: 'success',
        title: message,
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
      setIsLeaved(true);
    } catch {
      Swal.fire({
        toast: true,
        icon: 'success',
        title: '죄송합니다. 크루 탈퇴에 실패하였습니다.',
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };

  return (
    <div className="w-20">
      <Button
        auto
        color="secondary"
        onClick={clickLeaveCrewButton}
        disabled={isLeaved}
      >
        {isLeaved ? '탈퇴 완료' : '크루 탈퇴'}
      </Button>
    </div>
  );
};

export default LeaveCrewButton;
