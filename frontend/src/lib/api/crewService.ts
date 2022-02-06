import axios from './axios';
import { ICreateCrew } from '../../modules/types/createCrew';
import { ICrewsData, ICrewType } from '../../modules/types/crewTypes';

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
  getCrewRange: (
    offset: number,
    limit: number
  ) => Promise<ICrewsData[] | Error>;
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
  kickCrewMember: (memberName: string) => Promise<{ message: string } | Error>;
  leaveCrew: (userName: string) => Promise<{ message: string } | Error>;
  signUpCrew: (
    token: string,
    crewName: string
  ) => Promise<{ message: number } | Error>;
  dismissRequstUser: (
    userNickName: string
  ) => Promise<{ message: string } | Error>;
  permitRequstUser: (
    userNickName: string
  ) => Promise<{ message: string } | Error>;
  delegateCrewLeader: (
    userNickName: string,
    token: string
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

  getCrewRange = async (offset: number, limit: number) => {
    try {
      const { data } = await axios.get<ICrewsData[]>('/crews', {
        params: {
          offset,
          limit,
        },
      });
      return data;
    } catch {
      throw Error('크루 리스트 조회 실패');
    }
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
      const { data } = await axios.delete<'삭제 완료'>(`/crews/${crewName}`, {
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
        newCrewName,
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

  kickCrewMember = async (memberName: string) => {
    try {
      const { data } = await axios.post<'추방 완료'>(
        `/crew/users/${memberName}/edit`
      );
      return { message: data };
    } catch {
      throw new Error('강제 추방에 실패하였습니다.');
    }
  };

  leaveCrew = async (userName: string) => {
    try {
      await axios.post<'추방 완료'>(`/crew/users/${userName}/edit`);
      return { message: '크루 탈퇴 완료' };
    } catch {
      throw new Error('강제 추방에 실패하였습니다.');
    }
  };

  signUpCrew = async (token: string, crewName: string) => {
    try {
      const { data } = await axios.post<number | '이미 크루가 존재합니다.'>(
        `/crews/${crewName}/request`,
        null,
        {
          headers: { 'x-auth-token': token },
        }
      );
      if (data === '이미 크루가 존재합니다.') throw Error(data);
      return { message: data };
    } catch (err: any | Error) {
      return Error(err);
    }
  };

  permitRequstUser = async (userNickName: string) => {
    try {
      const { data } = await axios.post<'추가 완료'>(
        `/crews/users/${userNickName}/request`
      );
      return { message: data };
    } catch (err: any | Error) {
      return Error(err);
    }
  };

  dismissRequstUser = async (userNickName: string) => {
    try {
      const { data } = await axios.delete<'삭제 완료'>(
        `/crews/users/${userNickName}/request`
      );
      return { message: data };
    } catch (err: any | Error) {
      return Error(err);
    }
  };

  delegateCrewLeader = async (userNickName: string, token: string) => {
    try {
      const { data } = await axios.patch<'위임 완료'>(
        `/crew/users/${userNickName}/edit`,
        { token }
      );
      return { message: data };
    } catch (err: any | Error) {
      return Error(err);
    }
  };
}

export default CrewService;
