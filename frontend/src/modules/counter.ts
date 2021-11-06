import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICounter {
  number: number;
}

const initialState = { number: 0 };

const counterSliceReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: {
      prepare: (number: ICounter) => {
        return { payload: number };
      },
      reducer: (state, action: PayloadAction<ICounter>) => {
        return { ...state, number: action.payload.number + 1 };
      },
    },
    decrement: {
      prepare: (number: ICounter) => {
        return { payload: number }; // 매게변수 number, payload === { number : 0 }
      },
      reducer: (state, action: PayloadAction<ICounter>) => {
        return { ...state, number: action.payload.number - 1 };
      },
    },
  },
});

const { actions, reducer } = counterSliceReducer;

export const counterActions = actions;

export default reducer;
