import { RootState } from '../../modules';

const mockStore: RootState = {
  signIn: {
    loginForm: {
      email: '',
      password: '',
    },
    error: {
      message: '',
      code: '',
    },
    userData: {
      email: '',
      nickname: '',
      address: '',
      crew: '',
      crewId: '',
      isCrewLeader: false,
    },
    signInStatus: '',
    isLogged: false,
  },
  signUp: {
    email: '',
    nickname: '',
    name: '',
    password: '',
    checkPassword: '',
    address: '',
    signUpFetchState: '',
    success: {
      nickName: '',
    },
    error: {
      code: '',
    },
  },
};

export { mockStore };
