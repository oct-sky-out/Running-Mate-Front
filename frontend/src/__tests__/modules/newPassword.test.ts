import reducer, { newPasswordActions } from '../../modules/newPassword';
import { INewPassword } from '../../modules/types/newPassword';

const initialState: INewPassword = {
  newPassword: '',
  checkNewPassword: '',
};

describe('', () => {
  test('새로 등록할 비밀번호가 같은가?', () => {
    expect(
      reducer(
        initialState,
        newPasswordActions.setNewPassword('examplePassword')
      ).newPassword
    ).toEqual('examplePassword');
  });
  test('확인 비밀번호가새로 등록할 비밀번호가 같은가?', () => {
    expect(
      reducer(
        initialState,
        newPasswordActions.setNewPassword('examplePassword')
      ).newPassword
    ).toEqual(
      reducer(
        initialState,
        newPasswordActions.setCheckNewPassword('examplePassword')
      ).checkNewPassword
    );
  });
});
