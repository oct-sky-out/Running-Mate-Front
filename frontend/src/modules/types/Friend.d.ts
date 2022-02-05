export type FriendRelations = 'NOTHING' | 'SEND' | 'RECEIVE' | 'COMPLETED';

export type FriendRequstStatus =
  | '친구요청 성공'
  | '친구요청 취소 성공'
  | '친구요청 수락 성공'
  | '이미 친구인 회원';

export interface FriendReduxType {
  requestFriendFetch: '' | 'Fetch' | 'Success' | 'Failure';
}
