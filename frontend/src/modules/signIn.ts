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
    userEmail: '',
  },
  signInStatus: '',
};

const signInSliceReducer = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setInit: (_state, _action: PayloadAction<void>) => {
      return {
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
    },
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
    signInSuccess: {
      prepare: (successData: { userEmail: string }) => {
        return { payload: successData };
      },
      reducer: (state, action: PayloadAction<{ userEmail: string }>) => {
        return { ...state, userData: action.payload, signInStatus: 'Success' };
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
