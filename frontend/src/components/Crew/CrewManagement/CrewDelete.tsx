import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import Swal from 'sweetalert2';
import CrewService from '../../../lib/api/crewService';
import { useSelector } from '../../../modules';

// import useLocalStroeageData from '../../../hooks/useLocalStorageData';

const CrewDelete = () => {
  const history = useHistory();
  const crewName = useSelector((state) => state.crew.crewName);
  const [deleteCrewName, setDeleteCrewName] = useState('');

  // const { getToken } = useLocalStroeageData();

  const deleteCrew = async () => {
    try {
      const { message } = await new CrewService().deleteCrew(crewName);
      await Swal.fire({
        title: message,
        icon: 'success',
        confirmButtonText: '뛰어요 페이지로 돌아가기.',
        confirmButtonColor: '#d33',
      });
      history.push('/crewList');
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        title: '삭제 실패',
        text: '삭제에 실패하였습니다. 죄송합니다.',
        icon: 'error',
        confirmButtonText: '확인',
      });
    }
  };

  return (
    <div className="h-screen col-span-4 w-full pt-20">
      <div className="w-2/3 flex flex-col items-center mx-auto my-0 space-y-20">
        <span className="text-2xl font-bold">
          관리하고 계시는 크루 이름을 입력해주세요.
        </span>
        <div className="w-2/3 flex flex-col justify-center">
          <Input
            bordered
            color="secondary"
            size="xlarge"
            width="100%"
            value={crewName}
            onChange={(e) => setDeleteCrewName(e.target.value)}
            labelPlaceholder="크루 이름 확인"
            type="text"
          />
        </div>
        <div>
          <Button
            rounded
            color="secondary"
            size="xlarge"
            disabled={!(deleteCrewName === crewName)}
            onClick={deleteCrew}
          >
            크루 삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CrewDelete;
