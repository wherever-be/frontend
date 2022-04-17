import { createSlice } from '@reduxjs/toolkit';

const viewportSlice = createSlice({
  name: 'viewport',
  initialState: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  reducers: {
    setSize(state, { payload: { width, height } }) {
      state.width = width || 0;
      state.height = height || 0;
    },
  },
});

export const { setSize } = viewportSlice.actions;
export default viewportSlice.reducer;
