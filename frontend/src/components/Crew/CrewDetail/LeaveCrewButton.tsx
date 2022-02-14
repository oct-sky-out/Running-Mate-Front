import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { crewActions } from '../../../modules/crew';
import { useSelector } from '../../../modules';
import useSwalerts from '../../../common/hooks/useSwalerts';

const LeaveCrewButton = () => {
  const { userNickName, token, crewFetchStatus } = useSelector((state) => ({
    userNickName: state.signIn.userData.nickName,
    token: state.signIn.token,
    crewFetchStatus: state.crew.crewRequestFetch,
  }));
  const dispatch = useDispatch();

  const [isLeaved, setIsLeaved] = useState(false);
  const { successToast, errorToast } = useSwalerts();

  const clickLeaveCrewButton = async () => {
    dispatch(crewActions.leaveCrew({ token, userNickName }));
  };

  useEffect(() => {
    if (crewFetchStatus === 'Success') {
      successToast('크루 탈퇴 완료.', '크루 탈퇴를 완료했습니다.');
      setIsLeaved(true);
      dispatch(crewActions.initCrewRequestFetch());
    }
    if (crewFetchStatus === 'Failure') {
      errorToast('크루 탈퇴 실패.', '죄송합니다. 크루 탈퇴에 실패하였습니다.');
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
