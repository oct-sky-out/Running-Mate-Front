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
      nickName: '',
      address: '',
      crewName: '',
      id: '',
      crewLeader: false,
    },
    signInStatus: '',
    token: '',
    isLogged: false,
  },
  signUp: {
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
    address: '',
    signUpFetchState: '',
    success: {
      id: 0,
    },
    error: {
      code: '',
    },
  },
  createCrew: {
    crew: {
      crewName: '',
      crewExplain: '',
      crewRegion: '',
    },
  },
  newPassword: {
    newPassword: '',
    checkNewPassword: '',
  },
  createNotice: {
    title: '',
    explain: '',
    location: '',
    time: new Date(),
    openChatLink: '',
    imageOneURL: '',
    imageTwoURL: '',
  },
};

export { mockStore };
