export interface ISignUp {
  email: string;
  nickname: string;
  name: string;
  password: string;
  checkPassword: string;
  postCode: string;
  address: string;
  optionAddress: string;
  signUpFetchState: '' | 'Fetch' | 'Success' | 'Error';
  success: {
    nickName: string;
  };
  error: {
    code: string;
  };
}

export interface ISignUpForm {
  email: string;
  nickname: string;
  name: string;
  password: string;
  postCode: string;
  address: string;
  optionAddress: string;
}