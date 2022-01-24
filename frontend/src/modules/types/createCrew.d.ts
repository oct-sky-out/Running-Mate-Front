export type CreateCrewStatusType = '' | 'Fetch' | 'Sucecss' | 'Failure';

export interface ICreateCrew {
  crew: {
    crewName: string;
    explanation: string;
    crewRegion: string;
    openChat: string;
  };
  createCrewStatus: CreateCrewStatusType;
}
