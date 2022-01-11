import axios from './axios';
import { ISignInForm, IUserData } from '../../modules/types/signInTypes';
import { ISignUpForm } from '../../modules/types/signUpTypes';

interface IUserService {
  signUp(signUpForm: ISignUpForm): void;
  login(signInDat: ISignInForm): void;
}

type MyPageType = {
  nickName: string;
  address: string;
  token: string;
};

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

  editMyPageData = async (myPageData: MyPageType) => {
    try {
      console.log('service test nickname = ', myPageData.nickName);
      console.log('service test address = ', myPageData.address);
      await axios.post(
        '/user',
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

  /*
   * getMyPgaeData가 필요할 경우는 유저 데이터를 업데이트하는 목적만 있으므로 바로 LocalStorage에 저장한다.
   * 나중에 필요할 시 수정.
   */
  getMyPageData: (token: string) => Promise<IUserData | false> = async (
    token: string
  ) => {
    try {
      const { data } = await axios.get<IUserData>('/mypage', {
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
      localStorage.setItem('userData', JSON.stringify(data));
      return { email, crewName, nickName, address, id, crewLeader };
    } catch {
      return false;
    }
  };
}

export default UserService;
