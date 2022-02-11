import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISignIn, IUserData } from './types/signInTypes';

const initialState: ISignIn = {
  loginForm: {
    email: '',
    password: '',
  },
  userData: {
    email: '',
    nickName: '',
    address: '',
    crewName: '',
    id: '',
    crewLeader: false,
  },
  signInFetchStatus: '',
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
      userData: {
        email: '',
        nickName: '',
        address: '',
        crewName: '',
        id: '',
        crewLeader: false,
      },
      signInFetchStatus: '',
      token: '',
      isLogged: false,
    }),
    setInitError: (state, _action: PayloadAction<void>) => ({
      ...state,
      signInFetchStatus: '',
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
        return { ...state, signInFetchStatus: 'Fetch' };
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
      prepare: (successData: IUserData) => {
        return { payload: successData };
      },
      reducer: (state, action: PayloadAction<IUserData>) => {
        return {
          ...state,
          userData: action.payload,
          signInFetchStatus: 'Success',
          isLogged: true,
        };
      },
    },
    signInFailure: (state, _action: PayloadAction<void>) => ({
      ...state,
      signInFetchStatus: 'Error',
    }),
  },
});

export const SignInActions = signInSliceReducer.actions;
export default signInSliceReducer.reducer;
