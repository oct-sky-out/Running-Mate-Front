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
      explanation: '',
      crewRegion: '',
      openChat: '',
    },
    createCrewStatus: '',
  },
  crew: {
    id: 0,
    crewLeaderId: 0,
    crewRegion: '',
    openChat: '',
    crewName: '',
    explanation: '',
    crews: [],
  },
  newPassword: {
    newPassword: '',
    checkNewPassword: '',
  },
  createNotice: {
    title: '',
    content: '',
    address: {
      si: '',
      gu: '',
      dong: '',
    },
    time: '',
    openChat: '',
    image: '',
  },
};

export { mockStore };
