import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import CrewService from '../../../lib/api/crewService';
import { useSelector } from '../../../modules';
import { crewActions } from '../../../modules/crew';
import PeopleList from '../../../common/components/PeopleList';
import PeopleSearch from '../../../common/components/PeopleSearch';
import useSwalerts from '../../../common/hooks/useSwalerts';

const CrewRequestManagement = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { requestUsers, crewFetchStatus } = useSelector((state) => ({
    requestUsers: state.crew.requestUsers,
    crewFetchStatus: state.crew.crewRequestFetch,
  }));
  const { errorToast, successToast } = useSwalerts();

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
        successToast('추방 성공!', '추방을 성공했습니다.');
      })
      .catch((reason) => {
        console.error(reason);
        errorToast('추방 실패', '추방을 실패하였습니다.😰');
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
      successToast('크루원 추가 성공!', '크루원을 추가했습니다!');
      dispatch(crewActions.initCrewRequestFetch());
    }
    if (crewFetchStatus === 'Failure') {
      errorToast('크루원 추가 실패', '크루원 추가를 실패했습니다.😰');
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
