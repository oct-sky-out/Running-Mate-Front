import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISignIn } from './types/signInTypes';

const initialState: ISignIn = {
  loginForm: {
    email: '',
    password: '',
  },
  error: {
    message: '',
    code: '',
  },
  userData: {
    email: '',
    nickName: '',
    address: '',
    crewName: '',
    id: '',
    crewLeader: false,
  },
  signInStatus: '',
  token: '',
  isLogged: false,
};

const signInSliceReducer = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setInit: (_state, _action: PayloadAction<void>) => ({
      loginForm: {
        email: '',
        password: '',
      },
      error: {
        message: '',
        code: '',
      },
      userData: {
        email: '',
        nickName: '',
        address: '',
        crewName: '',
        id: '',
        crewLeader: false,
      },
      signInStatus: '',
      token: '',
      isLogged: false,
    }),
    setInitError: (state, _action: PayloadAction<void>) => ({
      ...state,
      error: {
        message: '',
        code: '',
      },
      signInStatus: '',
    }),
    setEmail: {
      prepare: (email: string) => {
        return { payload: email };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          loginForm: { ...state.loginForm, email: action.payload },
        };
      },
    },
    setPassword: {
      prepare: (password: string) => {
        return { payload: password };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          loginForm: { ...state.loginForm, password: action.payload },
        };
      },
    },
    signInFetch: {
      prepare: (fetchData: { email: string; password: string }) => {
        return { payload: fetchData };
      },
      reducer: (
        state,
        _action: PayloadAction<{ email: string; password: string }>
      ) => {
        return { ...state, signInStatus: 'Fetch' };
      },
    },
    setToken: {
      prepare: (token: string) => {
        return { payload: token };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          token: action.payload,
        };
      },
    },
    setUserNicknameData: {
      prepare: (successData: string) => {
        return { payload: successData };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          userData: {
            ...state.userData,
            nickName: action.payload,
          },
        };
      },
    },
    setUserAddressData: {
      prepare: (successData: string) => {
        return { payload: successData };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          userData: {
            ...state.userData,
            address: action.payload,
          },
        };
      },
    },
    signInSuccess: {
      prepare: (successData: {
        email: string;
        nickName: string;
        address: string;
        crewName: string;
        id: string;
        crewLeader: boolean;
      }) => {
        return { payload: successData };
      },
      reducer: (
        state,
        action: PayloadAction<{
          email: string;
          nickName: string;
          address: string;
          crewName: string;
          id: string;
          crewLeader: boolean;
        }>
      ) => {
        return {
          ...state,
          userData: action.payload,
          signInStatus: 'Success',
          isLogged: true,
        };
      },
    },
    signInFailure: {
      prepare: (signInStatus: { message: string; code: string }) => {
        return { payload: signInStatus };
      },
      reducer: (
        state,
        action: PayloadAction<{
          message: string;
          code: string;
        }>
      ) => {
        return { ...state, error: action.payload, signInStatus: 'Error' };
      },
    },
  },
});

export const SignInActions = signInSliceReducer.actions;
export default signInSliceReducer.reducer;
