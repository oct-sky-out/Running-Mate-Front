import reducer, { SignInActions } from '../../modules/signIn';
import { ISignIn } from '../../modules/types/signInTypes';

const initState: ISignIn = {
  loginForm: {
    email: '',
    password: '',
  },
  error: {
    message: '',
    code: '',
  },
  userData: {
    userEmail: '',
  },
  signInStatus: '',
};

describe('', () => {
  test('리덕스 setEmail, setPassword 액션을 통해서 email, password state가 잘 바뀌는지 확인한다.', () => {
    const importedEmailState = reducer(
      initState,
      SignInActions.setEmail('example@naver.com')
    );
    const { email, password } = reducer(
      importedEmailState,
      SignInActions.setPassword('12345')
    ).loginForm;

    expect(email).toEqual('example@naver.com');
    expect(password).toEqual('12345');
  });
  test('리덕스 signInFetch 액션(유저가 로그인을 했을 시)을 통해서 signInStatus 잘 바뀌는지 확인한다.', () => {
    const { userData, signInStatus } = reducer(
      initState,
      SignInActions.signInFetch({
        email: 'example@naver.com',
        password: '1q23',
      })
    );
    expect(signInStatus).toEqual('Fetch');
  });
  test('리덕스 signInSuccess 액션을 통해서 signInStatus 잘 바뀌는지 확인한다.', () => {
    const { userData, signInStatus } = reducer(
      initState,
      SignInActions.signInSuccess({ userEmail: 'example@naver.com' })
    );
    expect(userData.userEmail).toEqual('example@naver.com');
    expect(signInStatus).toEqual('Success');
  });
  test('리덕스 signInFailure 액션을 통해서 password signInStatus 잘 바뀌는지 확인한다.', () => {
    const { error, signInStatus } = reducer(
      initState,
      SignInActions.signInFailure({ message: 'fail', code: '404' })
    );
    expect(error).toEqual({ message: 'fail', code: '404' });
    expect(signInStatus).toEqual('Error');
  });
});
