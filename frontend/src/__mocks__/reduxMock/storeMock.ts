import { RootState } from '../../modules';
import { useMockStore } from '../../modules';
import * as customSelecor from '../../modules';

const store = useMockStore;
const dispatchMock = jest.fn(store.dispatch);
store.dispatch = dispatchMock;

export let useSelectorMock = jest.spyOn(customSelecor, 'useSelector');
export let useDispatchMock = dispatchMock;

const mockStore: RootState = {
  signIn: {
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
  },
  signUp: {
    email: '',
    nickname: '',
    name: '',
    password: '',
    checkPassword: '',
    postCode: '',
    address: '',
    optionAddress: '',
    signUpFetchState: '',
    success: {
      nickName: '',
    },
    error: {
      code: '',
    },
  },
};

export { mockStore };
