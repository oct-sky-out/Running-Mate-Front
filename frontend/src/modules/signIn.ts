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
    userEmail: string;
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
    userEmail: '',
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
      prepare: (successData: { userEmail: string }) => {
        return { payload: successData };
      },
      reducer: (state, action: PayloadAction<{ userEmail: string }>) => {
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
