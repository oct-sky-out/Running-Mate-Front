import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotice } from '../modules/types/createNotice';

const initialState: INotice = {
  title: '',
  explain: '',
  location: '',
  time: '',
  openChatLink: '',
};

const createNoticeSliceReducer = createSlice({
  name: 'createNotice',
  initialState,
  reducers: {
    setInit: (_state, _action: PayloadAction<void>) => {
      return {
        title: '',
        explain: '',
        location: '',
        time: '',
        openChatLink: '',
      };
    },
    setTitle: {
      prepare: (title: string) => {
        return { payload: title };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, title: action.payload };
      },
    },
    setExplain: {
      prepare: (explain: string) => {
        return { payload: explain };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, explain: action.payload };
      },
    },
    setLocation: {
      prepare: (location: string) => {
        return { payload: location };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, location: action.payload };
      },
    },
    setTime: {
      prepare: (time: string) => {
        return { payload: time };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, time: action.payload };
      },
    },
    setOpenChatLink: {
      prepare: (openChatLink: string) => {
        return { payload: openChatLink };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, openChatLink: action.payload };
      },
    },
  },
});

export const CreateNoticeActions = createNoticeSliceReducer.actions;
export default createNoticeSliceReducer.reducer;
