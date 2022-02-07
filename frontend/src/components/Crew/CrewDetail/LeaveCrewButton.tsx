import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { crewActions } from '../../../modules/crew';
import CrewService from '../../../lib/api/crewService';
import { useSelector } from '../../../modules';

const LeaveCrewButton = () => {
  const { userNickName, token, crewFetchStatus } = useSelector((state) => ({
    userNickName: state.signIn.userData.nickName,
    token: state.signIn.token,
    crewFetchStatus: state.crew.crewRequestFetch,
  }));
  const dispatch = useDispatch();

  const [isLeaved, setIsLeaved] = useState(false);

  const clickLeaveCrewButton = async () => {
    dispatch(crewActions.leaveCrew({ token, userNickName }));
  };

  useEffect(() => {
    if (crewFetchStatus === 'Success') {
      Swal.fire({
        toast: true,
        icon: 'success',
        title: '크루 탈퇴 완료.',
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
      setIsLeaved(true);
      dispatch(crewActions.initCrewRequestFetch());
    }
    if (crewFetchStatus === 'Failure') {
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
      dispatch(crewActions.initCrewRequestFetch());
    }
  }, [crewFetchStatus]);

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
