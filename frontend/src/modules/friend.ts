import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FriendReduxType } from './types/Friend';

const initialState: FriendReduxType = {
  requestFriendFetch: '',
};

const frinedSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    initRequestFriendFetch: (_state, _action: PayloadAction<void>) => ({
      requestFriendFetch: '',
    }),
    requestFriend: (
      _state,
      _action: PayloadAction<{
        token: string;
        requesteeName: string;
        requestRole: 'request' | 'permit' | 'dismiss';
      }>
    ) => ({
      requestFriendFetch: 'Fetch',
    }),
    successRequestFriend: (_state, _action: PayloadAction<void>) => ({
      requestFriendFetch: 'Success',
    }),
    failureRequestFriend: (_state, _action: PayloadAction<void>) => ({
      requestFriendFetch: 'Failure',
    }),
  },
});

export const friendActions = frinedSlice.actions;
export default frinedSlice.reducer;
