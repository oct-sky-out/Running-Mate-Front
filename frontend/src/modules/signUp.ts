import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISignUp, ISignUpForm } from './types/signUpTypes';

type FetchStateType = '' | 'Fetch' | 'Success' | 'Error';

const initialState: ISignUp = {
  email: '',
  nickname: '',
  password: '',
  checkPassword: '',
  address: '',
  signUpFetchState: '',
  success: {
    id: 0,
  },
};

const signUpSliceReducer = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setInit: (_state, _action: PayloadAction<void>) => {
      return {
        email: '',
        nickname: '',
        password: '',
        checkPassword: '',
        address: '',
        signUpFetchState: '',
        success: {
          id: 0,
        },
      };
    },
    setEmail: {
      prepare: (email: string) => {
        return { payload: email };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, email: action.payload };
      },
    },
    setNickname: {
      prepare: (nickname: string) => {
        return { payload: nickname };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, nickname: action.payload };
      },
    },
    setPassword: {
      prepare: (password: string) => {
        return { payload: password };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, password: action.payload };
      },
    },
    setCheckPassword: {
      prepare: (checkPassword: string) => {
        return { payload: checkPassword };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, checkPassword: action.payload };
      },
    },
    setAddress: {
      prepare: (address: string) => {
        return { payload: address };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, address: action.payload };
      },
    },
    setSignUpState: (state, action: PayloadAction<void>) => {
      return { ...state, signUpFetchState: '', error: { code: '' } };
    },
    signUpFetch: {
      prepare: (
        signUpForm: ISignUpForm & { signUpFetchState: FetchStateType }
      ) => {
        return { payload: signUpForm };
      },
      reducer: (
        state,
        action: PayloadAction<
          ISignUpForm & { signUpFetchState: FetchStateType }
        >
      ) => {
        return { ...state, signUpFetchState: action.payload.signUpFetchState };
      },
    },
    signUpFetchSuccess: {
      prepare: (successData: number) => {
        return { payload: successData };
      },
      reducer: (state, action: PayloadAction<number>) => {
        return {
          ...state,
          success: { id: action.payload },
          signUpFetchState: 'Success',
        };
      },
    },
    signUpFetchError: (state, _action: PayloadAction<void>) => ({
      ...state,
      signUpFetchState: 'Error',
    }),
  },
});

export const SignUpActions = signUpSliceReducer.actions;
export default signUpSliceReducer.reducer;
