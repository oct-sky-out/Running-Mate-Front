import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetNoticesType, NoticesType } from './types/notice';

const initialState: { viewNoticeData: GetNoticesType } & {
  notices: NoticesType;
} = {
  viewNoticeData: {
    address: {
      dou: '',
      si: '',
      gu: '',
    },
    closed: false,
    content: '',
    count: 0,
    id: 0,
    image: '',
    meetingTime: '',
    openChat: '',
    regDate: '',
    title: '',
    author: '',
  },
  notices: {},
};

const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    setInit: (_state, _action: PayloadAction<void>) => ({
      viewNoticeData: {
        address: {
          dou: '',
          si: '',
          gu: '',
        },
        closed: false,
        content: '',
        count: 0,
        id: 0,
        image: '',
        meetingTime: '',
        openChat: '',
        regDate: '',
        title: '',
        author: '',
      },
      notices: {},
    }),
    setOneViewNotice: (state, action: PayloadAction<GetNoticesType>) => ({
      ...state,
      viewNoticeData: {
        address: {
          dou: action.payload.address.dou,
          si: action.payload.address.si,
          gu: action.payload.address.gu,
        },
        closed: action.payload.closed,
        content: action.payload.content,
        count: action.payload.count,
        id: action.payload.id,
        image: action.payload.image,
        meetingTime: action.payload.meetingTime,
        openChat: action.payload.openChat,
        regDate: action.payload.regDate,
        title: action.payload.title,
        author: action.payload.author,
      },
    }),
    setNotices: (state, action: PayloadAction<NoticesType>) => ({
      ...state,
      notices: action.payload,
    }),
  },
});

export const noticeActions = noticeSlice.actions;
export default noticeSlice.reducer;
