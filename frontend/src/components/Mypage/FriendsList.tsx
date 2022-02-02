import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { v4 } from 'uuid';
import { Button } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { useSelector } from '../../modules';
import PeopleSearch from '../../common/components/PeopleSearch';
import FriendService from '../../lib/api/friendService';
import PeopleList from '../../common/components/PeopleList';

const FriendsList = () => {
  const location = useLocation();
  const history = useHistory();

  const token = useSelector((state) => state.signIn.token);

  const [userFriends, setUserFriends] = useState<string[]>([]);

  const getUserFriends = async () => {
    try {
      const { friendList } = await new FriendService().getMyFriends(token);
      setUserFriends(friendList);
    } catch {
      Swal.fire({
        toast: true,
        title: '친구 정보 불러오기 실패.',
        text: '친구 정보를 불러오는데 실패하였습니다.',
        icon: 'error',
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };

  const goManageRequestFriends = () => {
    history.push('/mypage/friends/requests');
  };

  useEffect(() => {
    getUserFriends();
  }, []);

  return (
    <div className="mx-auto my-0 py-10 px-20 flex flex-col space-y-10 justify-center">
      <div className="w-full flex space-x-3 justify-center">
        <div>
          <Button bordered auto color="secondary">
            친구목록
          </Button>
        </div>
        <div>
          <Button
            bordered
            auto
            color="secondary"
            onClick={goManageRequestFriends}
          >
            친구요청
          </Button>
        </div>
      </div>
      <PeopleSearch placeholder="검색 할 친구이름을 입력하세요" />
      {userFriends.length !== 0 ? (
        <div className="border-2 border-purple rounded-lg flex flex-col divide-y divide-purple">
          {userFriends.map((friend) => (
            <PeopleList key={v4()} userNickName={friend}>
              <div className="w-30">
                <Button auto rounded color="secondary">
                  친구삭제
                </Button>
              </div>
            </PeopleList>
          ))}
        </div>
      ) : (
        <h1 className="text-2xl">친구목록이 비어있습니다.</h1>
      )}
    </div>
  );
};

export default FriendsList;
