import { combineReducers } from 'redux';

import applicationReducer from './application/applicationSlice';
import settingsReducer from './settings/settingsSlice';

export default combineReducers({
  application: applicationReducer,
  settings: settingsReducer,
});
