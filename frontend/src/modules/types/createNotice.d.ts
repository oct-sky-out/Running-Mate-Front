export interface INotice {
  title: string;
  explain: string;
  location: string;
  time: Date;
  openChatLink: string;
  imageOneURL: string | ArrayBuffer | null | undefined;
  imageTwoURL: string | ArrayBuffer | null | undefined;
}
