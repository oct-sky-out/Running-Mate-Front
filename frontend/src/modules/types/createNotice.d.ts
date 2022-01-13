export interface INotice {
  title: string;
  content: string;
  address: AddressType;
  time: string;
  openChat: string;
  image: string;
}

export type AddressType = {
  si: string;
  gu: string;
  dong: string;
};
