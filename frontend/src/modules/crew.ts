import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICrewType, ICrews, ICrewRequestFetch } from './types/crewTypes';

const initialState: ICrewType & ICrews & ICrewRequestFetch = {
  id: 0,
  crewLeaderId: 0,
  crewRegion: '',
  openChat: '',
  crewName: '',
  explanation: '',
  crews: [],
  crewRequestFetch: '',
  userDtos: [],
  requestUsers: [],
  crewRequested: false,
};

const crewSlice = createSlice({
  name: 'crew',
  initialState,
  reducers: {
    setInit: (_state, _action: PayloadAction<void>) => ({
      id: 0,
      crewLeaderId: 0,
      crewRegion: '',
      openChat: '',
      crewName: '',
      explanation: '',
      crews: [],
      crewRequestFetch: '',
      userDtos: [],
      requestUsers: [],
      crewRequested: false,
    }),
    initCrewRequestFetch: (state, _action: PayloadAction<void>) => ({
      ...state,
      crewRequestFetch: '',
    }),
    requestCerwDetail: (state, _action: PayloadAction<string>) => ({
      ...state,
      crewRequestFetch: 'Fetch',
    }),
    sucessCrewRequest: (state, _action: PayloadAction<void>) => ({
      ...state,
      crewRequestFetch: 'Success',
    }),
    failureCrewRequest: (state, _action: PayloadAction<void>) => ({
      ...state,
      crewRequestFetch: 'Failure',
    }),
    setCrewDetail: (state, action: PayloadAction<ICrewType>) => ({
      ...state,
      id: action.payload.id,
      crewLeaderId: action.payload.crewLeaderId,
      crewRegion: action.payload.crewRegion,
      openChat: action.payload.openChat,
      crewName: action.payload.crewName,
      explanation: action.payload.explanation,
      userDtos: action.payload.userDtos,
      requestUsers: action.payload.requestUsers,
    }),
    getCrews: (state, action: PayloadAction<ICrews>) => ({
      ...state,
      crews: action.payload.crews,
    }),
    setCrewName: (state, action: PayloadAction<string>) => ({
      ...state,
      crewName: action.payload,
    }),
    setCrewRequested: (state, action: PayloadAction<boolean>) => ({
      ...state,
      crewRequested: action.payload,
    }),
    deleteCrew: (
      state,
      _action: PayloadAction<{
        crewName: string;
        token: string;
        userNickName: string;
      }>
    ) => ({
      ...state,
      crewRequestFetch: 'Fetch',
    }),
    signUpRequestCrew: (
      state,
      _action: PayloadAction<{
        crewName: string;
        token: string;
      }>
    ) => ({
      ...state,
      crewRequestFetch: 'Fetch',
    }),
  },
});

export const crewActions = crewSlice.actions;
export default crewSlice.reducer;
