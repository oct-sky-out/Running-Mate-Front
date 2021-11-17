import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StringMappingType } from 'typescript';

interface ISignIn {
  loginForm: {
    email: string;
    password: string;
  };
  error: {
    message: string;
    code: string;
  };
  userData: {
    success: boolean;
  };
  signInStatus: boolean;
}

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
    success: false,
  },
  signInStatus: false,
};

const signInSliceReducer = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
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
    signInSuccess: {
      prepare: (signInStatus: { success: boolean }) => {
        return { payload: signInStatus };
      },
      reducer: (
        state,
        action: PayloadAction<{
          success: boolean;
        }>
      ) => {
        return { ...state, userData: action.payload, signInStatus: true };
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
        return { ...state, error: action.payload, signInStatus: false };
      },
    },
  },
});

export const SignInActions = signInSliceReducer.actions;
export default signInSliceReducer.reducer;
