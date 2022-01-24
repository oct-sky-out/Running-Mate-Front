import { Avatar, Button } from '@nextui-org/react';
import Swal from 'sweetalert2';
import CrewService from '../../../lib/api/crewService';
import { useSelector } from '../../../modules';

interface IProps {
  memberNickName: string;
  memberUserId: number | string;
}

const PeopleList: React.FC<IProps> = ({ memberNickName, memberUserId }) => {
  const { crewLeaderId, crewLeaderName } = useSelector((state) => ({
    crewLeaderId: state.crew.crewLeaderId,
    crewLeaderName: state.signIn.userData.nickName,
  }));

  const kickCrewMember = () => {
    new CrewService()
      .kickCrewMember(crewLeaderName, memberNickName)
      .then(({ message }) => {
        Swal.fire({
          title: message,
          text: '추방에 성공하였습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });
      })
      .catch((reason) => {
        console.error(reason);
        Swal.fire({
          title: '추방 실패',
          text: '추방에 실패하였습니다. 죄송합니다.',
          icon: 'error',
          confirmButtonText: '확인',
        });
      });
  };
  return (
    <div className="w-full h-20 p-5 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <Avatar
          size="large"
          src="/avatars/avatar-2.png"
          color="secondary"
          bordered
          className="float-left"
        />
        <span>{memberNickName || '닉네임'}</span>
      </div>
      <div className="w-1/3 flex justify-end space-x-3">
        {memberUserId !== crewLeaderId && (
          <div className="w-30">
            <Button auto rounded color="secondary" onClick={kickCrewMember}>
              크루원 추방
            </Button>
          </div>
        )}
        {+memberUserId === crewLeaderId && (
          <div className="w-30">
            <Button auto rounded color="secondary">
              리더
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeopleList;
