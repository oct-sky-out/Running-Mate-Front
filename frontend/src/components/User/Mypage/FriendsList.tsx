import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { Button, Loading } from '@nextui-org/react';
import { useSelector } from '../../../modules';
import { friendActions } from '../../../modules/friend';
import PeopleSearch from '../../../common/components/PeopleSearch';
import FriendService from '../../../lib/api/friendService';
import PeopleList from '../../../common/components/PeopleList';
import useSwalerts from '../../../common/hooks/useSwalerts';

const FriendsList = () => {
  const history = useHistory();

  const { token, requestFriendFetch } = useSelector((state) => ({
    token: state.signIn.token,
    requestFriendFetch: state.friend.requestFriendFetch,
  }));
  const dispatch = useDispatch();

  const [userFriends, setUserFriends] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { errorToast } = useSwalerts();

  const getUserFriends = async () => {
    try {
      const { friendList } = await new FriendService().getMyFriends(token);
      setUserFriends(friendList);
    } catch {
      errorToast(
        '친구 정보 불러오기 실패.',
        '친구 정보를 불러오는데 실패하였습니다.'
      );
    }
  };

  const dismissFriend = (userNickName: string) => {
    setLoading(true);
    dispatch(
      friendActions.requestFriend({
        token,
        requesteeName: userNickName,
        requestRole: 'dismiss',
        refreshFriendApi: getUserFriends,
      })
    );
    setLoading(false);
  };

  const goManageRequestFriends = () => {
    history.push('/user/mypage/friends/requests');
  };

  useEffect(() => {
    getUserFriends();
  }, []);

  useEffect(() => {
    if (requestFriendFetch === 'Success')
      dispatch(friendActions.initRequestFriendFetch());
    if (requestFriendFetch === 'Failure') {
      errorToast('요청실패', '죄송합니다. 요청에 실패하였습니다.😰');
      dispatch(friendActions.initRequestFriendFetch());
    }
  }, [requestFriendFetch]);

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
      {loading && (
        <div>
          <Loading type="points" color="secondart" />
        </div>
      )}
      {userFriends.length !== 0 ? (
        <div className="border-2 border-purple rounded-lg flex flex-col divide-y divide-purple">
          {userFriends.map((friend) => (
            <PeopleList key={v4()} userNickName={friend}>
              <div className="w-30">
                <Button
                  auto
                  rounded
                  color="secondary"
                  onClick={() => dismissFriend(friend)}
                >
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
