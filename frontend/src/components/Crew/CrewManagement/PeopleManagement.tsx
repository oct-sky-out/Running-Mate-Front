import { Button, Input } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { v4 } from 'uuid';
import CrewService from '../../../lib/api/crewService';
import { useSelector } from '../../../modules';
import PeopleList from './PeopleList';
import PeopleSearch from './PeopleSearch';

const PeopleManagement = () => {
  const { crewMembers, crewLeaderId, crewLeaderName, token } = useSelector(
    (state) => ({
      crewMembers: state.crew.userDtos,
      crewLeaderId: state.crew.crewLeaderId,
      crewLeaderName: state.signIn.userData.nickName,
      token: state.signIn.token,
    })
  );

  const kickCrewMember = (memberNickName: string) => {
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

  const deligateCrewMember = (memberNickName: string) => {
    new CrewService()
      .delegateCrewLeader(memberNickName, token)
      .then(({ message }) => {
        Swal.fire({
          title: message,
          text: '위임에 성공하였습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });
      })
      .catch((reason) => {
        console.error(reason);
        Swal.fire({
          title: '위임 실패',
          text: '위임에 실패하였습니다. 죄송합니다.',
          icon: 'error',
          confirmButtonText: '확인',
        });
      });
  };

  return (
    <div className="mx-auto my-0 py-10 px-20 flex flex-col space-y-10 justify-center">
      <PeopleSearch placeholder="크루원이름을 입력하세요" />
      <div className="border-2 border-purple rounded-lg flex flex-col divide-y divide-purple">
        {crewMembers.map((member) => (
          <PeopleList key={v4()} userNickName={member.nickName}>
            {+member.id !== crewLeaderId && (
              <>
                <div className="w-30">
                  <Button
                    auto
                    rounded
                    color="secondary"
                    onClick={() => kickCrewMember(member.nickName)}
                  >
                    크루원 추방
                  </Button>
                </div>
                <div className="w-30">
                  <Button
                    auto
                    rounded
                    color="secondary"
                    onClick={() => deligateCrewMember(member.nickName)}
                  >
                    크루장 위임
                  </Button>
                </div>
              </>
            )}
            {+member.id === crewLeaderId && (
              <div className="w-30">
                <Button auto rounded color="secondary">
                  리더
                </Button>
              </div>
            )}
          </PeopleList>
        ))}
      </div>
    </div>
  );
};

export default PeopleManagement;
