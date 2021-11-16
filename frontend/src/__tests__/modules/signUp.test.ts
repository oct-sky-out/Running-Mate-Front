import reducer, { SignUpActions } from '../../modules/signUp';

const initState = {
  email: '',
  nickname: '',
  name: '',
  password: '',
  checkPassword: '',
  address: '',
  postCode: '',
  optionAddress: '',
};

describe('', () => {
  test('리덕스 setEmail 액션을 통해서 email state가 잘 바뀌는지 확인한다.', () => {
    expect(
      reducer(initState, SignUpActions.setEmail('example@naver.com')).email
    ).toEqual('example@naver.com');
  });

  test('리덕스 setNickname 액션을 통해서 nickname state가 잘 바뀌는지 확인한다.', () => {
    expect(
      reducer(initState, SignUpActions.setNickname('roy')).nickname
    ).toEqual('roy');
  });

  test('리덕스 setName 액션을 통해서 name state가 잘 바뀌는지 확인한다.', () => {
    expect(
      reducer(initState, SignUpActions.setName('honggildong')).name
    ).toEqual('honggildong');
  });

  test('리덕스 setPassword 액션을 통해서 password state가 잘 바뀌는지 확인한다.', () => {
    expect(
      reducer(initState, SignUpActions.setPassword('12345')).password
    ).toEqual('12345');
  });

  test('리덕스 setCheckPassword 액션을 통해서 checkPassword state가 잘 바뀌는지 확인한다.', () => {
    expect(
      reducer(initState, SignUpActions.setCheckPassword('12345')).checkPassword
    ).toEqual('12345');
  });

  test('리덕스 setAddress 액션을 통해서 adress state가 잘 바뀌는지 확인한다.', () => {
    expect(
      reducer(initState, SignUpActions.setAddress('seoul')).address
    ).toEqual('seoul');
  });
  test('리덕스 setPostCode 액션을 통해서 postCode state가 잘 바뀌는지 확인한다.', () => {
    expect(
      reducer(initState, SignUpActions.setPostCode('123')).postCode
    ).toEqual('123');
  });
  test('리덕스 setOptionAddress 액션을 통해서 optionAddress state가 잘 바뀌는지 확인한다.', () => {
    expect(
      reducer(initState, SignUpActions.setOptionAddress('dongjak'))
        .optionAddress
    ).toEqual('dongjak');
  });
});
