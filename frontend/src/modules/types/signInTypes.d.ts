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
    userEmail: string;
  };
  signInStatus: '' | 'Fetch' | 'Success' | 'Error';
  isLogged: boolean;
}

export interface ISignInForm {
  email: string;
  password: string;
}
