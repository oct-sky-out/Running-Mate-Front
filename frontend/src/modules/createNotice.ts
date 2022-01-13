import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotice, AddressType } from './types/createNotice';

const initialState: INotice = {
  title: '',
  content: '',
  address: {
    si: '',
    gu: '',
    dong: '',
  },
  time: '',
  openChat: '',
  image: '',
};

const createNoticeSliceReducer = createSlice({
  name: 'createNotice',
  initialState,
  reducers: {
    setInit: (_state, _action: PayloadAction<void>) => {
      return {
        title: '',
        content: '',
        address: {
          si: '',
          gu: '',
          dong: '',
        },
        time: '',
        openChat: '',
        image: '',
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
      prepare: (content: string) => {
        return { payload: content };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, content: action.payload };
      },
    },
    setAddress: {
      prepare: (address: AddressType) => {
        return { payload: address };
      },
      reducer: (state, action: PayloadAction<AddressType>) => {
        return { ...state, address: action.payload };
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
    setOpenChat: {
      prepare: (openChat: string) => {
        return { payload: openChat };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, openChat: action.payload };
      },
    },
    setImage: {
      prepare: (image: string) => {
        return { payload: image };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, image: action.payload };
      },
    },
  },
});

export const CreateNoticeActions = createNoticeSliceReducer.actions;
export default createNoticeSliceReducer.reducer;
