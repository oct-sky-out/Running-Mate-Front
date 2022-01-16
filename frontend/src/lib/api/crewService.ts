import axios from './axios';
import ICreateCrew from '../../modules/types/createCrew';
import { ICrewType } from '../../modules/types/crewTypes';

//* create crew type
export type CrewRequestType = '크루 생성 완료' | '이미 크루가 존재합니다.';

interface ICrewService {
  createCrew: ({
    token,
    createCrewData,
  }: {
    token: string;
    createCrewData: Omit<ICreateCrew, 'createCrewStatus'>;
  }) => Promise<CrewRequestType>;
  getCrewDetail: (crewName: string) => Promise<ICrewType | Error>;
}

class CrewService implements ICrewService {
  createCrew = async ({
    token,
    createCrewData,
  }: {
    token: string;
    createCrewData: Omit<ICreateCrew, 'createCrewStatus'>;
  }) => {
    const { data } = await axios.post<CrewRequestType>(
      '/crew/new',
      { ...createCrewData.crew },
      { headers: { 'x-auth-token': token } }
    );
    return data;
  };

  getCrewDetail = async (crewName: string) => {
    try {
      const { data } = await axios.get<ICrewType>(`/crew/${crewName}`);
      return data;
    } catch {
      throw new Error('크루 상세 데이터 조회실패');
    }
  };
}

export default CrewService;
