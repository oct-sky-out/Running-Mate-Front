export interface ISignIn {
  loginForm: {
    email: string;
    password: string;
  };
  error: {
    message: string;
    code: string;
  };
  userData: {
    email: string;
    nickname: string;
    address: string;
    crewName: string | null;
    crewId: string;
    crewLeader: boolean;
  };
  signInStatus: '' | 'Fetch' | 'Success' | 'Error';
  token: string;
  isLogged: boolean;
}

export interface ISignInForm {
  email: string;
  password: string;
}
