import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { v4 } from 'uuid';
import CrewService from '../../../lib/api/crewService';
import { useSelector } from '../../../modules';
import { crewActions } from '../../../modules/crew';
import PeopleList from '../../../common/components/PeopleList';
import PeopleSearch from '../../../common/components/PeopleSearch';

const PeopleManagement = () => {
  const history = useHistory();
  const params = useParams<{ id: string }>();

  const { crewMembers, crewLeaderId, userNickName, token, crewFetchStatus } =
    useSelector((state) => ({
      crewMembers: state.crew.userDtos,
      crewLeaderId: state.crew.crewLeaderId,
      userNickName: state.signIn.userData.nickName,
      token: state.signIn.token,
      crewFetchStatus: state.crew.crewRequestFetch,
    }));
  const dispatch = useDispatch();

  const kickCrewMember = (memberNickName: string) => {
    new CrewService()
      .kickCrewMember(memberNickName)
      .then(({ message }) => {
        dispatch(
          crewActions.setCrewUsers(
            crewMembers.filter(
              (crewMember) => crewMember.nickName !== memberNickName
            )
          )
        );
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
    dispatch(
      crewActions.deligateCrewLeader({ token, memberNickName, userNickName })
    );
  };

  useEffect(() => {
    if (crewFetchStatus === 'Success') {
      dispatch(crewActions.initCrewRequestFetch());
      Swal.fire({
        title: '위임 성공.',
        html: '<div>위임에 성공하였습니다.</div><h2>탈퇴 시 크루 상세 페이지정보로 이동 후 크루 탈퇴 버튼을 눌러 탈퇴해주세요.</h2>',
        icon: 'success',
        confirmButtonText: '확인',
      }).then(
        (result) => result.isConfirmed && history.push(`/crewList/${params.id}`)
      );
    }
    if (crewFetchStatus === 'Failure') {
      Swal.fire({
        title: '위임 실패',
        text: '위임에 실패하였습니다. 죄송합니다.',
        icon: 'error',
        confirmButtonText: '확인',
      });
      dispatch(crewActions.initCrewRequestFetch());
    }
  }, [crewFetchStatus]);

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
