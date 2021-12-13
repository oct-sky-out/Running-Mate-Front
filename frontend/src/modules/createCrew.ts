import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICreateCrew {
  crew: {
    crewName: string;
    crewExplain: string;
    crewRegion: string;
  };
}

const initialState: ICreateCrew = {
  crew: {
    crewName: '',
    crewExplain: '',
    crewRegion: '',
  },
};

const createCrewSliceReducer = createSlice({
  name: 'creatCrew',
  initialState,
  reducers: {
    setInit: (_state, _action: PayloadAction<void>) => {
      return {
        crew: {
          crewName: '',
          crewExplain: '',
          crewRegion: '',
          isCrewLeader: '',
        },
      };
    },
    setCrewName: {
      prepare: (crewName: string) => {
        return { payload: crewName };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          crew: { ...state.crew, crewName: action.payload },
        };
      },
    },
    setCrewExplain: {
      prepare: (crewExplain: string) => {
        return { payload: crewExplain };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          crew: { ...state.crew, crewExplain: action.payload },
        };
      },
    },
    setCrewRegion: {
      prepare: (crewRegion: string) => {
        return { payload: crewRegion };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          crew: { ...state.crew, crewRegion: action.payload },
        };
      },
    },
  },
});

export const CreateCrewActions = createCrewSliceReducer.actions;
export default createCrewSliceReducer.reducer;
