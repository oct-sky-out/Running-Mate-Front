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
    crew: string;
    crewId: string;
    isCrewLeader: boolean;
  };
  signInStatus: '' | 'Fetch' | 'Success' | 'Error';
  isLogged: boolean;
}

export interface ISignInForm {
  email: string;
  password: string;
}
