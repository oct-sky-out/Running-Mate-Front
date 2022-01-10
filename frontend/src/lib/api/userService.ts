import axios from './axios';
import { ISignInForm } from '../../modules/types/signInTypes';
import { ISignUpForm } from '../../modules/types/signUpTypes';

interface IUserService {
  signUp(signUpForm: ISignUpForm): void;
  login(signInDat: ISignInForm): void;
}

class UserService implements IUserService {
  signUp = async (signUpForm: ISignUpForm) => {
    try {
      const sendData = {
        email: signUpForm.email,
        password: signUpForm.password,
        nickName: signUpForm.nickname,
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
}

export default UserService;
