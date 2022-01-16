import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICrewType, ICrews } from './types/crewTypes';

const initialState: ICrewType & ICrews = {
  id: 0,
  crewLeaderId: 0,
  crewRegion: '',
  openChat: '',
  crewName: '',
  explanation: '',
  crews: [],
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
    }),
    getCrewDetail: (state, action: PayloadAction<ICrewType>) => ({
      ...state,
      id: action.payload.id,
      crewLeaderId: action.payload.crewLeaderId,
      crewRegion: action.payload.crewRegion,
      openChat: action.payload.openChat,
      crewName: action.payload.crewName,
      explanation: action.payload.explanation,
    }),
    getCrews: (state, action: PayloadAction<ICrews>) => ({
      ...state,
      crews: action.payload.crews,
    }),
    setCrewName: (state, action: PayloadAction<string>) => ({
      ...state,
      crewName: action.payload,
    }),
  },
});

const crewActions = crewSlice.actions;
export default crewSlice.reducer;
