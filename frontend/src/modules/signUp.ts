import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISignUp {
  email: string;
  nickname: string;
  name: string;
  password: string;
  checkPassword: string;
  adress: string;
}

const initialState: ISignUp = {
  email: '',
  nickname: '',
  name: '',
  password: '',
  checkPassword: '',
  adress: '',
};

const signUpSliceReducer = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
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
    setAdress: {
      prepare: (adress: string) => {
        return { payload: adress };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, adress: action.payload };
      },
    },
  },
});

export const SignUpActions = signUpSliceReducer.actions;
export default signUpSliceReducer.reducer;
