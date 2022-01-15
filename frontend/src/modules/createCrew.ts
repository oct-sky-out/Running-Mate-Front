import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CreateCrewType = {
  createCrewData: Omit<ICreateCrew, 'createCrewStatus'>;
  token: string;
};
type CreateCrewStatusType = '' | 'Fetch' | 'Sucecss' | 'Failure';

export interface ICreateCrew {
  crew: {
    crewName: string;
    explanation: string;
    crewRegion: string;
    openChat: string;
  };
  createCrewStatus: CreateCrewStatusType;
}

const initialState: ICreateCrew = {
  crew: {
    crewName: '',
    explanation: '',
    crewRegion: '',
    openChat: '',
  },
  createCrewStatus: '',
};

const createCrewSliceReducer = createSlice({
  name: 'creatCrew',
  initialState,
  reducers: {
    setInit: (_state, _action: PayloadAction<void>) => {
      return {
        crew: {
          crewName: '',
          explanation: '',
          crewRegion: '',
          openChat: '',
        },
        createCrewStatus: '',
      };
    },
    newCrew: (state, _action: PayloadAction<CreateCrewType>) => {
      return { ...state, createCrewStatus: 'Fetch' };
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
    setExplanation: {
      prepare: (explanation: string) => {
        return { payload: explanation };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          crew: { ...state.crew, explanation: action.payload },
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
    setOpenChat: {
      prepare: (openChat: string) => ({ payload: openChat }),
      reducer: (state, action: PayloadAction<string>) => ({
        ...state,
        crew: { ...state.crew, openChat: action.payload },
      }),
    },
    setCreateOpenChatStatus: (
      state,
      action: PayloadAction<CreateCrewStatusType>
    ) => ({ ...state, createCrewStatus: action.payload }),
  },
});

export const CreateCrewActions = createCrewSliceReducer.actions;
export default createCrewSliceReducer.reducer;
