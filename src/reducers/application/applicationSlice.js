import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import i18n from 'i18next';
import { v4 as uuidv4 } from 'uuid';

export const search = createAsyncThunk('application/searchStatus', async (_, { dispatch, getState }) => {
  const { destination, durationRange, friends, timeFrame } = getState().application;
  const data = { destination, durationRange, friends, timeFrame };

  if (
    !data.durationRange?.min ||
    !data.durationRange?.max ||
    !data.timeFrame?.start ||
    !data.timeFrame?.end ||
    data.friends.some(f => !f.name || !f.name)
  ) {
    dispatch(setHighlightInputIssues(true));
    throw new Error();
  }

  return await (
    await fetch('https://api.wherever.be:42069/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  ).json();
});

function getInitialState() {
  return {
    timeFrame: { start: '2022-04-18', end: '2022-07-18' },
    durationRange: { min: 3, max: 7 },
    friends: [{ id: uuidv4(), name: 'Me', city: 'STOCKHOLM' }],
    destination: { country: 'de' },
  };

  return {
    timeFrame: undefined,
    durationRange: { min: 3, max: 7 },
    friends: [{ id: uuidv4(), name: '', city: '' }],
    destination: {},
    highlightInputIssues: false,
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
    setTimeFrame(state, { payload: [start, end] }) {
      if (!start || !end) delete state.timeFrame;
      else state.timeFrame = { start, end };
    },
    setDurationRange(state, { payload: [min, max] }) {
      state.durationRange = { min, max };
    },
    addFriend(state) {
      state.friends.push({ id: uuidv4(), name: '', city: '' });
    },
    removeFriend(state, { payload: id }) {
      state.friends = state.friends.filter(f => f.id !== id);
    },
    setFriendProps(state, { payload: { id, ...props } }) {
      state.friends = state.friends.map(f => (f.id === id ? { ...f, ...props } : f));
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
    setHighlightInputIssues(state, { payload: val }) {
      state.highlightInputIssues = val;
    },
  },
  extraReducers: builder => {
    builder.addCase(search.pending, state => {
      delete state.chosenDestination;
      state.search = { loading: true };
    });
    builder.addCase(search.fulfilled, (state, { payload }) => {
      state.search.loading = false;
      state.search.results = payload.searchResults;

      if (state.search.results.length === 0) {
        message.error(i18n.t('application:noResults'));
      }
    });
    builder.addCase(search.rejected, (state, action) => {
      state.search.loading = false;
      if (action.error.message) message.error(action.error.message);
    });
  },
});

export const {
  reset,
  setTimeFrame,
  setDurationRange,
  addFriend,
  removeFriend,
  setFriendProps,
  setDestination,
  setChosenDestination,
  setProps,
  setHighlightInputIssues,
} = applicationSlice.actions;

export default applicationSlice.reducer;
