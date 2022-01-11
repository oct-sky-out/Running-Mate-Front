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
    nickName: string;
    address: string;
    crewName: string | null;
    id: string;
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
