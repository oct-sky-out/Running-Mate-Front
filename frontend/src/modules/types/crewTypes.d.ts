export interface ICrewType {
  id: number;
  crewLeaderId: number;
  crewRegion: string;
  openChat: string;
  crewName: string;
  explanation: string;
}

export interface ICrews {
  crews: ICrewType[];
}
