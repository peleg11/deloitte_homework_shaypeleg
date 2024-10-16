import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import axios from 'axios';

const USERS_SLICE_NAME = 'USERS';

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: USERS_SLICE_NAME,
  initialState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<User[]>) => ({
      ...state,
      users: payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(
      searchUsers.fulfilled,
      (state, { payload }: PayloadAction<User[]>) => ({
        ...state,
        users: payload,
      })
    );
  },
});

export const searchUsers = createAsyncThunk(
  `${USERS_SLICE_NAME}/getUsers`,
  async (query: string) => {
    const response = await axios.get(`http://localhost:8080?q=${query}`);
    return response.data;
  }
);

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
