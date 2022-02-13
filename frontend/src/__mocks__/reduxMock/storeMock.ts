import { RootState } from '../../modules';

const mockStore: RootState = {
  signIn: {
    loginForm: {
      email: '',
      password: '',
    },
    userData: {
      email: '',
      nickName: '',
      address: '',
      crewName: '',
      id: '',
      crewLeader: false,
    },
    signInFetchStatus: '',
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
    crewRequested: false,
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
    noticeFetchStatus: '',
  },
  friend: { requestFriendFetch: '' },
};

export { mockStore };
