import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INewPassword } from './types/newPassword';

const initialState: INewPassword = {
  newPassword: '',
  checkNewPassword: '',
};

const newPasswordSlice = createSlice({
  name: 'newPassword',
  initialState,
  reducers: {
    setNewPassword: {
      prepare: (newPassword: string) => {
        return { payload: newPassword };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, newPassword: action.payload };
      },
    },
    setCheckNewPassword: {
      prepare: (newCheckPassword: string) => {
        return { payload: newCheckPassword };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, checkNewPassword: action.payload };
      },
    },
  },
});

export const newPasswordActions = newPasswordSlice.actions;
export default newPasswordSlice.reducer;
