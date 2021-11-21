import reducer, { SignInActions } from '../../modules/signIn';

const initState = {
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
  signInStatus: false,
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
  test('리덕스 signInSuccess 액션을 통해서 signIn가 잘 바뀌는지 확인한다.', () => {
    const { userData, signInStatus } = reducer(
      initState,
      SignInActions.signInSuccess({ userEmail: 'example@naver.com' })
    );
    expect(userData.userEmail).toEqual('example@naver.com');
    expect(signInStatus).toEqual(true);
  });
  test('리덕스 signInFailure 액션을 통해서 password state가 잘 바뀌는지 확인한다.', () => {
    const { error, signInStatus } = reducer(
      initState,
      SignInActions.signInFailure({ message: 'fail', code: '404' })
    );
    expect(error).toEqual({ message: 'fail', code: '404' });
    expect(signInStatus).toEqual(false);
  });
});
