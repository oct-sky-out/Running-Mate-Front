export interface INotice {
  title: string;
  content: string;
  address: AddressType;
  meetingTime: string;
  openChat: string;
  image: string;
}

export type AddressType = {
  dou: string;
  si: string;
  gu: string;
};

export type GetNoticesType = {
  address: AddressType;
  closed: boolean;
  content: string;
  count: number;
  id: number;
  image: string;
  meetingTime: string;
  openChat: string;
  regDate: string;
  title: string;
  author: string;
};

export type NoticesType = {
  [key in string]: GetNoticesType;
};
