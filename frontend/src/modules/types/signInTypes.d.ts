export interface ISignIn {
  loginForm: {
    email: string;
    password: string;
  };
  userData: {
    email: string;
    nickName: string;
    address: string;
    crewName: string | null;
    id: string;
    crewLeader: boolean;
  };
  signInFetchStatus: '' | 'Fetch' | 'Success' | 'Error';
  token: string;
  isLogged: boolean;
}

export interface IUserData {
  email: string;
  nickName: string;
  address: string;
  crewName: string | null;
  id: string;
  crewLeader: boolean;
}

export interface ISignInForm {
  email: string;
  password: string;
}
