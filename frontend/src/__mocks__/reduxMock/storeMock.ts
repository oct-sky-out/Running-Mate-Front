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
    crewRequestFetch: '',
    userDtos: [],
    requestUsers: [],
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
      dou: '',
    },
    meetingTime: '',
    openChat: '',
    image: '',
  },
  viewNotice: {
    viewNoticeData: {
      address: {
        dou: '',
        si: '',
        gu: '',
      },
      closed: false,
      content: '',
      count: 0,
      id: 0,
      image: '',
      meetingTime: '',
      openChat: '',
      regDate: '',
      title: '',
      author: '',
    },
    notices: {},
  },
};

export { mockStore };
