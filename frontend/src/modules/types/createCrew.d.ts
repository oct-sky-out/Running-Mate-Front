interface ICreateCrew {
  crew: {
    crewName: string;
    explanation: string;
    crewRegion: string;
    openChat: string;
  };
  createCrewStatus: CreateCrewStatusType;
}

export default ICreateCrew;
