import { combineReducers } from 'redux';

import applicationReducer from './application/applicationSlice';
import settingsReducer from './settings/settingsSlice';
import viewportReducer from './viewport/viewportSlice';

export default combineReducers({
  application: applicationReducer,
  settings: settingsReducer,
  viewport: viewportReducer,
});
