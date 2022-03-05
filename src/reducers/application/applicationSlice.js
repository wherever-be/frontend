import { createSlice } from '@reduxjs/toolkit';

const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    timeFrame: undefined,
  },
  reducers: {
    setTimeFrame(state, { payload: [start, end] }) {
      if (!start || !end) delete state.timeFrame;
      else state.timeFrame = { start, end };
    },
  },
});

export const { setTimeFrame } = applicationSlice.actions;

export default applicationSlice.reducer;
