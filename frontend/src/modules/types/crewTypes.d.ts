import { IUserData } from './signInTypes';

export interface ICrewType {
  id: number;
  crewLeaderId: number;
  crewRegion: string;
  openChat: string;
  crewName: string;
  explanation: string;
  userDtos: IUserData[];
  requestUsers: IUserData[];
}

export interface ICrews {
  crews: ICrewType[];
}

export interface ICrewRequestFetch {
  crewRequestFetch: '' | 'Fetch' | 'Success' | 'Failure';
}
