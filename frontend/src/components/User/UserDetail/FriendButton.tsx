import { Button, Loading } from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GiThreeFriends } from 'react-icons/gi';
import Swal from 'sweetalert2';
import { useSelector } from '../../../modules';
import { friendActions } from '../../../modules/friend';
import FriendService from '../../../lib/api/friendService';
import { FriendRelations } from '../../../modules/types/Friend';

interface IProps {
  userNickName: string;
}

const FriendButton: React.FC<IProps> = ({ userNickName }) => {
  // * redux
  const { token, friendFetchStatus } = useSelector((state) => ({
    token: state.signIn.token,
    friendFetchStatus: state.friend.requestFriendFetch,
  }));
  const dispatch = useDispatch();

  // * useState
  const [friednRelationResult, setFriednRelationResult] = useState<
    FriendRelations | 'LOADING'
  >('LOADING');

  // * useCallback
  const checkFriendRelation = useCallback(async () => {
    try {
      const { friendRelation } =
        await new FriendService().getUserByUserRelation(token, userNickName);
      setFriednRelationResult(friendRelation);
    } catch (err) {
      console.error(err);
      Swal.fire({
        toast: true,
        icon: 'error',
        title: '사용자 정보 조회 실패.',
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  }, [userNickName]);

  //* any function
  const requestFriend = () => {
    setFriednRelationResult('LOADING');
    dispatch(
      friendActions.requestFriend({
        token,
        requesteeName: userNickName,
        requestRole: 'request',
        refreshFriendApi: checkFriendRelation,
      })
    );
  };

  const permitFriend = () => {
    setFriednRelationResult('LOADING');
    dispatch(
      friendActions.requestFriend({
        token,
        requesteeName: userNickName,
        requestRole: 'permit',
        refreshFriendApi: checkFriendRelation,
      })
    );
  };

  const dismissFriend = () => {
    setFriednRelationResult('LOADING');
    dispatch(
      friendActions.requestFriend({
        token,
        requesteeName: userNickName,
        requestRole: 'dismiss',
        refreshFriendApi: checkFriendRelation,
      })
    );
  };

  const assignFriendRelationResult = useCallback(() => {
    switch (friednRelationResult) {
      case 'NOTHING':
        return (
          <Button color="secondary" onClick={requestFriend}>
            친구요청
          </Button>
        );
      case 'SEND':
        return (
          <Button color="secondary" onClick={requestFriend}>
            친구 추가 요청됨
          </Button>
        );
      case 'RECEIVE':
        return (
          <div className="flex space-x-3">
            <div>
              <Button auto color="secondary" onClick={permitFriend}>
                친구요청 수락
              </Button>
            </div>
            <div>
              <Button auto color="secondary" onClick={dismissFriend}>
                친구요청 거절
              </Button>
            </div>
          </div>
        );
      case 'COMPLETED':
        return (
          <div className="flex space-x-3">
            <div className="w-24 p-3 border-2 rounded-2xl border-purple flex space-x-1 justify-center">
              <GiThreeFriends color="#8b8bf5" />
              <span>친구</span>
            </div>
            <Button color="secondary" onClick={dismissFriend}>
              친구삭제
            </Button>
          </div>
        );
      case 'LOADING':
        return <Loading color="secondary" type="points" />;
      default:
        return null;
    }
  }, [friednRelationResult]);

  // * useEffect
  useEffect(() => {
    checkFriendRelation();
  }, [checkFriendRelation]);
  useEffect(() => {
    if (friendFetchStatus === 'Success')
      dispatch(friendActions.initRequestFriendFetch());
    if (friendFetchStatus === 'Failure') {
      Swal.fire({
        toast: true,
        icon: 'error',
        title: '죄송합니다. 요청에 실패하였습니다.',
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
      dispatch(friendActions.initRequestFriendFetch());
    }
  }, [friendFetchStatus]);

  return <div>{assignFriendRelationResult()}</div>;
};

export default FriendButton;
