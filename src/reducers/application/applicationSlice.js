import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import i18n from 'i18next';

export const search = createAsyncThunk('application/searchStatus', async (_, { getState }) => {
  const { destination, durationRange, friends, timeFrame } = getState().application;
  const data = { destination, durationRange, friends, timeFrame };

  return await (
    await fetch('http://13.53.121.104/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  ).json();
});

function getInitialState() {
  return {
    step: 'chooseTimeFrame',
    timeFrame: undefined,
    durationRange: { min: 3, max: 7 },
    friends: [],
    destination: {},
  };
}

const applicationSlice = createSlice({
  name: 'application',
  initialState: getInitialState(),
  reducers: {
    reset(state) {
      for (const k of Object.keys(state)) delete state[k];
      Object.assign(state, getInitialState());
    },
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
    setChosenDestination(state, { payload }) {
      state.chosenDestination = payload;
    },
    setProps(state, { payload }) {
      Object.assign(state, payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(search.pending, state => {
      state.search = { loading: true };
    });
    builder.addCase(search.fulfilled, (state, { payload }) => {
      state.search.loading = false;
      state.search.results = payload.searchResults;

      if (state.search.results.length === 0) {
        message.error(i18n.t('application:steps.chooseDestination.noResults'));
      } else if ([...new Set(state.search.results.map(r => r.destination))].length === 1) {
        state.chosenDestination = state.search.results[0].destination;
        state.step = 'resultsFinal';
      } else {
        state.step = 'resultsCities';
      }
    });
    builder.addCase(search.rejected, (state, action) => {
      state.search.loading = false;
      message.error(action.error.message);
    });
  },
});

export const {
  reset,
  setStep,
  setTimeFrame,
  setDurationRange,
  addFriend,
  removeFriend,
  setDestination,
  setChosenDestination,
  setProps,
} = applicationSlice.actions;

export default applicationSlice.reducer;
