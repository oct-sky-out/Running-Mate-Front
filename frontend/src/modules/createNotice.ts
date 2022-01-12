import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotice } from './types/createNotice';

const initialState: INotice = {
  title: '',
  explain: '',
  location: '',
  time: new Date(),
  openChatLink: '',
  imageOneURL: '',
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
        time: new Date(),
        openChatLink: '',
        imageOneURL: '',
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
      prepare: (time: Date) => {
        return { payload: time };
      },
      reducer: (state, action: PayloadAction<Date>) => {
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
    setImageOneURL: {
      prepare: (imageOneURL: string | ArrayBuffer) => {
        return { payload: imageOneURL };
      },
      reducer: (state, action: PayloadAction<string | ArrayBuffer>) => {
        return { ...state, imageOneURL: action.payload };
      },
    },
  },
});

export const CreateNoticeActions = createNoticeSliceReducer.actions;
export default createNoticeSliceReducer.reducer;
