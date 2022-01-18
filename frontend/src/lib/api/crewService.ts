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
  }) => Promise<{ message: CrewRequestType }>;
  getCrewDetail: (crewName: string) => Promise<ICrewType | Error>;
  deleteCrew: (
    crewName: string,
    token?: string
  ) => Promise<{ message: string } | Error>;
  changeNewCrewName: (
    currentCrewName: string,
    newCrewName: string,
    token?: string
  ) => Promise<{ message: string } | Error>;
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
    return { message: data };
  };

  getCrewDetail = async (crewName: string) => {
    try {
      const { data } = await axios.get<ICrewType>(`/crews/${crewName}`);
      return data;
    } catch {
      throw new Error('크루 상세 데이터 조회실패');
    }
  };

  deleteCrew = async (crewName: string, token?: string) => {
    try {
      // 토큰은 정확히 알아보고 난 후 정함.
      const { data } = await axios.delete<'삭제완료'>(`/crews/${crewName}`, {
        headers: { 'x-auth-token': token || '' },
      });
      return { message: data };
    } catch {
      throw Error('크루 삭제 실패');
    }
  };

  changeNewCrewName = async (
    currentCrewName: string,
    newCrewName: string,
    token?: string
  ) => {
    try {
      const { data } = await axios.post<'이름 변경 완료'>(
        `/crews/${currentCrewName}`,
        { crewName: currentCrewName, newName: newCrewName },
        {
          headers: {
            'x-auth-token': token || '',
            'Content-Type': 'text/plain',
          },
        }
      );
      return { message: data };
    } catch {
      throw new Error('정보변경에 실패했습니다.');
    }
  };
}

export default CrewService;
