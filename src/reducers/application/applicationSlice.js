import { createSlice } from '@reduxjs/toolkit';

const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    step: 'chooseTimeFrame',
    timeFrame: undefined,
    durationRange: { min: 3, max: 7 },
    friends: [],
    destination: {},
  },
  reducers: {
    setStep(state, { payload: newStep }) {
      state.step = newStep;
    },
    setTimeFrame(state, { payload: [start, end] }) {
      if (!start || !end) delete state.timeFrame;
      else state.timeFrame = { start, end };
    },
    setDurationRange(state, { payload: [min, max] }) {
      state.durationRange = { min, max };
    },
    addFriend(state, { payload: { name, city } }) {
      state.friends.push({ name, city });
    },
    removeFriend(state, { payload: name }) {
      state.friends = state.friends.filter(f => f.name !== name);
    },
    setDestination(state, { payload }) {
      state.destination = payload;
    },
  },
});

export const { setStep, setTimeFrame, setDurationRange, addFriend, removeFriend, setDestination } =
  applicationSlice.actions;

export default applicationSlice.reducer;

export const search = () => async (dispatch, getState) => {
  console.log(getState());
};
