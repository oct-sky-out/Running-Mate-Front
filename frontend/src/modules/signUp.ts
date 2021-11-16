import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISignUp {
  email: string;
  nickname: string;
  name: string;
  password: string;
  checkPassword: string;
  postCode: string;
  address: string;
  optionAddress: string;
}

const initialState: ISignUp = {
  email: '',
  nickname: '',
  name: '',
  password: '',
  checkPassword: '',
  postCode: '',
  address: '',
  optionAddress: '',
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
  },
});

export const SignUpActions = signUpSliceReducer.actions;
export default signUpSliceReducer.reducer;
