import axios from './axios';
import {
  FriendRelations,
  FriendRequstStatus,
} from '../../modules/types/Friend';

interface IFriendService {
  getMyFriends(toekn: string): Promise<{ friendList: string[] }>;
  getRequestFriend(token: string): Promise<{ requestFriendList: string[] }>;
  getUserByUserRelation(
    token: string,
    requesteeName: string
  ): Promise<{ friendRelation: FriendRelations }>;
  requestFriend(
    token: string,
    requesteeName: string
  ): Promise<{ message: FriendRequstStatus }>;
  permitFriendRequst(
    token: string,
    requesteeName: string
  ): Promise<{ message: '친구요청 수락 성공' }>;
  dismissFriendRequst(
    token: string,
    requesteeName: string
  ): Promise<{ message: 'delete 성공' }>;
}

class FriendService implements IFriendService {
  getMyFriends = async (token: string) => {
    try {
      const { data } = await axios.get<string[]>('/user/friends', {
        headers: { 'x-auth-token': token },
      });
      return { friendList: data };
    } catch (error: any | Error) {
      throw Error(error);
    }
  };

  getRequestFriend = async (token: string) => {
    try {
      const { data } = await axios.get<string[]>('/user/friends/requests', {
        headers: { 'x-auth-token': token },
      });
      return { requestFriendList: data };
    } catch (error: any | Error) {
      throw Error(error);
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
      throw Error(error);
    }
  };

  requestFriend = async (token: string, requesteeName: string) => {
    const { data } = await axios.post<FriendRequstStatus | '잘못된 요청'>(
      `/user/friends/${requesteeName}`,
      { requesteeName },
      { headers: { 'x-auth-token': token } }
    );
    if (data === '잘못된 요청') throw Error(data);
    return { message: data };
  };

  permitFriendRequst = async (token: string, requesteeName: string) => {
    const { data } = await axios.post<'친구요청 수락 성공' | '잘못된 요청'>(
      `/user/friends/${requesteeName}`,
      { requesteeName },
      { headers: { 'x-auth-token': token } }
    );
    if (data === '잘못된 요청') throw Error(data);
    return { message: data };
  };

  dismissFriendRequst = async (token: string, requesteeName: string) => {
    const { data } = await axios.delete<'delete 성공' | '잘못된 요청'>(
      `/user/friends/${requesteeName}`,
      {
        headers: { 'x-auth-token': token },
      }
    );
    if (data === '잘못된 요청') throw Error(data);
    return { message: data };
  };
}

export default FriendService;
