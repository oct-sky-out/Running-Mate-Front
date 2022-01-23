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
  crews: {
    id: number;
    crewLeaderId: number;
    crewRegion: string;
    openChat: string;
    crewName: string;
    explanation: string;
  }[];
}

export interface ICrewsData {
  id: number;
  crewLeaderId: number;
  crewRegion: string;
  openChat: string;
  crewName: string;
  explanation: string;
}

export interface ICrewRequestFetch {
  crewRequestFetch: '' | 'Fetch' | 'Success' | 'Failure';
}
