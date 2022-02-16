import axios from './axios';
import { ISignInForm, IUserData } from '../../modules/types/signInTypes';
import { ISignUpForm } from '../../modules/types/signUpTypes';

type CheckTokenResultType = { tokenState: boolean; message: string };

type MyPageType = {
  nickName: string;
  address: string;
  token: string;
};
interface IUserService {
  signUp(signUpForm: ISignUpForm): void;
  login(signInDat: ISignInForm): void;
  logOut(token: string): Promise<void>;
  getUser(nickName: string, token: string): Promise<false | IUserData>;
  leaveAccount(
    nickName: string,
    token: string
  ): Promise<Error | { message: '삭제 완료' }>;
  tokenValid(token: string | null): Promise<CheckTokenResultType>;
}

class UserService implements IUserService {
  signUp = async (signUpForm: ISignUpForm) => {
    try {
      const sendData = {
        email: signUpForm.email,
        password: signUpForm.password,
        nickName: signUpForm.nickName,
        address: signUpForm.address,
      };
      const { data } = await axios.post<number>('/join', sendData);

      return { userId: data };
    } catch (err: any) {
      throw new Error('서버오류로 인해 회원가입 실패하였습니다.');
    }
  };

  login = async (signInData: ISignInForm) => {
    try {
      const { data } = await axios.post('/login', signInData);
      return { ...data };
    } catch (err: any) {
      throw new Error('아이디 또는 비밀번호를 다시 확인해주세요.');
    }
  };

  logOut = async (token: string) => {
    try {
      const { tokenState } = await this.tokenValid(token);
      if (!tokenState) throw new Error('로그아웃 오류');
      await axios.get<'잘못된 요청' | '로그아웃 성공'>('/user/logout', {
        headers: {
          'x-auth-token': token,
        },
      });
    } catch {
      throw new Error('로그아웃 오류');
    }
  };

  editMyPageData = async (myPageData: MyPageType) => {
    try {
      await axios.post(
        `/user/${myPageData.nickName}`,
        {
          nickName: myPageData.nickName,
          address: myPageData.address,
        },
        {
          headers: {
            'x-auth-token': myPageData.token,
          },
        }
      );
      return true;
    } catch {
      return false;
    }
  };

  leaveAccount = async (token: string, nickName: string) => {
    try {
      const { data } = await axios.delete<'삭제 완료'>(`/users/${nickName}`, {
        headers: { 'X-AUTH-PATH': token },
      });
      return { message: data };
    } catch {
      throw Error('삭제 실패');
    }
  };

  /*
   * getMyPgaeData가 필요할 경우는 유저 데이터를 업데이트하는 목적만 있으므로 바로 LocalStorage에 저장한다.
   * 나중에 필요할 시 수정.
   */
  getMyPageData = async (token: string) => {
    try {
      const { data } = await axios.get<IUserData>('/user', {
        headers: {
          'x-auth-token': token,
        },
      });
      localStorage.setItem('userData', JSON.stringify(data));
      return data;
    } catch {
      return false;
    }
  };

  getUser = async (userNickName: string, token: string) => {
    try {
      const { data } = await axios.get<IUserData>(`/validate`, {
        headers: {
          'x-auth-token': token,
        },
      });
      const { email, crewName, nickName, address, id, crewLeader } = {
        email: data.email,
        crewName: data.crewName,
        nickName: data.nickName,
        address: data.address,
        id: data.id,
        crewLeader: data.crewLeader,
      };
      return { email, crewName, nickName, address, id, crewLeader };
    } catch {
      throw new Error('유저 조회 오류');
    }
  };

  tokenValid = async (token: string | null) => {
    try {
      if (!token) throw Error('token is not find please check token');

      const { data } = await axios.get<'ok' | '만료된 토큰'>('/validate', {
        headers: { 'x-auth-token': token },
      });
      if (data === '만료된 토큰')
        throw Error('token have been expired please check token');
      return {
        tokenState: true,
        message: 'token is alive',
      };
    } catch (error: any) {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      return {
        tokenState: false,
        message: error.message,
      };
    }
  };
}

export default UserService;
