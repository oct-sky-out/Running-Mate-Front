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
