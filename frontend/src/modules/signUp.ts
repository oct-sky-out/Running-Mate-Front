import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISignUp, ISignUpForm } from './types/signUpTypes';

type fetchStateType = '' | 'Fetch' | 'Success' | 'Error';

const initialState: ISignUp = {
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
};

const signUpSliceReducer = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<void>) => {
      return {
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
    setName: {
      prepare: (name: string) => {
        return { payload: name };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, name: action.payload };
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
    setPostCode: {
      prepare: (postCode: string) => {
        return { payload: postCode };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, postCode: action.payload };
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
    setOptionAddress: {
      prepare: (optionAddress: string) => {
        return { payload: optionAddress };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, optionAddress: action.payload };
      },
    },
    signUpFetch: {
      prepare: (
        signUpForm: ISignUpForm & { signUpFetchState: fetchStateType }
      ) => {
        return { payload: signUpForm };
      },
      reducer: (
        state,
        action: PayloadAction<
          ISignUpForm & { signUpFetchState: fetchStateType }
        >
      ) => {
        return { ...state, signUpFetchState: action.payload.signUpFetchState };
      },
    },
    signUpFetchSuccess: {
      prepare: (successData: string) => {
        return { payload: successData };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          success: { nickName: action.payload },
          signUpFetchState: 'Success',
        };
      },
    },
    signUpFetchError: {
      prepare: (errorData: string) => {
        return { payload: errorData };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          error: { code: action.payload },
          signUpFetchState: 'Error',
        };
      },
    },
  },
});

export const SignUpActions = signUpSliceReducer.actions;
export default signUpSliceReducer.reducer;
