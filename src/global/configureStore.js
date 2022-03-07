import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import rootReducer from '../reducers';

export default () => {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
  return { store };
};
