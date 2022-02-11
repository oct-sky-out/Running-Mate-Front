import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { v4 } from 'uuid';
import CrewService from '../../../lib/api/crewService';
import { useSelector } from '../../../modules';
import { crewActions } from '../../../modules/crew';
import PeopleList from '../../../common/components/PeopleList';
import PeopleSearch from '../../../common/components/PeopleSearch';

const CrewRequestManagement = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { requestUsers, crewFetchStatus } = useSelector((state) => ({
    requestUsers: state.crew.requestUsers,
    crewFetchStatus: state.crew.crewRequestFetch,
  }));

  const filterRequestUser = (requestUserNickName: string) =>
    dispatch(
      crewActions.setRequsetUsers(
        requestUsers.filter(
          (userNickName) => userNickName !== requestUserNickName
        )
      )
    );

  const dismissRequestUser = (requestUserNickName: string) => {
    new CrewService()
      .dismissRequstUser(requestUserNickName)
      .then(() => {
        filterRequestUser(requestUserNickName);
        Swal.fire({
          toast: true,
          icon: 'success',
          title: '추방 성공!',
          position: 'top-end',
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
          showCloseButton: true,
        });
      })
      .catch((reason) => {
        console.error(reason);
        Swal.fire({
          toast: true,
          icon: 'error',
          title: '추방 실패',
          position: 'top-end',
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
          showCloseButton: true,
        });
      });
  };

  const peremitRequstUser = (requestUserNickName: string) => {
    filterRequestUser(requestUserNickName);
    dispatch(
      crewActions.permitCrewRequst({
        userNickName: requestUserNickName,
        crewName: params.id,
      })
    );
  };

  useEffect(() => {
    if (crewFetchStatus === 'Success') {
      Swal.fire({
        toast: true,
        icon: 'success',
        title: '크루원 추가 성공!',
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
      dispatch(crewActions.initCrewRequestFetch());
    }
    if (crewFetchStatus === 'Failure') {
      Swal.fire({
        toast: true,
        icon: 'error',
        title: '크루원 추가 실패',
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
    <div className="mx-auto my-0 py-10 px-20 flex flex-col space-y-10 justify-center">
      <PeopleSearch placeholder="요청자 입력" />
      <div className="border-2 border-purple rounded-lg flex flex-col divide-y divide-purple">
        {requestUsers.map((requestUserNickName) => (
          <PeopleList key={v4()} userNickName={requestUserNickName}>
            <div className="w-30">
              <Button
                auto
                rounded
                color="secondary"
                onClick={() => dismissRequestUser(requestUserNickName)}
              >
                추방
              </Button>
            </div>
            <div className="w-30">
              <Button
                auto
                rounded
                color="secondary"
                onClick={() => peremitRequstUser(requestUserNickName)}
              >
                수락
              </Button>
            </div>
          </PeopleList>
        ))}
      </div>
    </div>
  );
};

export default CrewRequestManagement;
