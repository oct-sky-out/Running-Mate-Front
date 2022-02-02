import axios from './axios';

type FriendRelations = 'NOTHING' | 'SEND' | 'RECEIVE' | 'COPLETED';
type FriendRequstStatus =
  | '친구요청 성공'
  | '친구요청 취소 성공'
  | '친구요청 수락 성공'
  | '이미 친구인 회원';

interface IFriendService {
  getMyFriends(toekn: string): Promise<{ friendList: string[] } | Error>;
  getRequestFriend(
    token: string
  ): Promise<{ requestFriendList: string[] } | Error>;
  getUserByUserRelation(
    token: string,
    requesteeName: string
  ): Promise<{ friendRelation: FriendRelations } | Error>;
  requestFriend(
    token: string,
    requesteeName: string
  ): Promise<{ message: FriendRequstStatus } | Error>;
  permitFriendRequst(
    token: string,
    requesteeName: string
  ): Promise<{ message: '친구요청 수락 성공' } | Error>;
  dismissFriendRequst(
    token: string,
    requesteeName: string
  ): Promise<{ message: 'delete 성공' } | Error>;
}

class FriendService implements IFriendService {
  getMyFriends = async (token: string) => {
    try {
      const { data } = await axios.get<string[]>('/user/friends', {
        headers: { 'x-auth-token': token },
      });
      return { friendList: data };
    } catch (error: any | Error) {
      return Error(error);
    }
  };

  getRequestFriend = async (token: string) => {
    try {
      const { data } = await axios.get<string[]>('/user/friends/requests', {
        headers: { 'x-auth-token': token },
      });
      return { requestFriendList: data };
    } catch (error: any | Error) {
      return Error(error);
    }
  };
  getUserByUserRelation = async (token: string, requesteeName: string) => {
    try {
      const { data } = await axios.get<FriendRelations | '잘못된 요청'>(
        `/user/friends/${requesteeName}`,
        {
          headers: { 'x-auth-token': token },
        }
      );
      if (data === '잘못된 요청') throw Error(data);
      return { friendRelation: data };
    } catch (error: any | Error) {
      return Error(error);
    }
  };

  requestFriend = async (token: string, requesteeName: string) => {
    try {
      const { data } = await axios.post<FriendRequstStatus | '잘못된 요청'>(
        `/user/friends/${requesteeName}`,
        { requesteeName },
        { headers: { 'x-auth-token': token } }
      );
      if (data === '잘못된 요청') throw Error(data);
      return { message: data };
    } catch (error: any | Error) {
      return Error(error);
    }
  };

  permitFriendRequst = async (token: string, requesteeName: string) => {
    try {
      const { data } = await axios.post<'친구요청 수락 성공' | '잘못된 요청'>(
        `/user/friends/${requesteeName}`,
        { requesteeName },
        { headers: { 'x-auth-token': token } }
      );
      if (data === '잘못된 요청') throw Error(data);
      return { message: data };
    } catch (error: any | Error) {
      return Error(error);
    }
  };

  dismissFriendRequst = async (token: string, requesteeName: string) => {
    try {
      const { data } = await axios.delete<'delete 성공' | '잘못된 요청'>(
        `/user/friends/${requesteeName}`,
        {
          headers: { 'x-auth-token': token },
        }
      );
      if (data === '잘못된 요청') throw Error(data);
      return { message: data };
    } catch (error: any | Error) {
      return Error(error);
    }
  };
}

export default FriendService;
