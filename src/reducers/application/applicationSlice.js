import { createSlice } from '@reduxjs/toolkit';

const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    number: 0,
  },
  reducers: {
    incrementNumber(state) {
      state.number++;
    },
  },
});

export const { incrementNumber } = applicationSlice.actions;

export default applicationSlice.reducer;
