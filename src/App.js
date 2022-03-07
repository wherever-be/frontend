import React from 'react';
import { Provider } from 'react-redux';

import Application from './reducers/application/Application';
import configureStore from './global/configureStore';
import GlobalStyle from './global/GlobalStyle';
import './global/fonts';
import './assets/i18n';

const { store } = configureStore();

export default () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Application />
    </Provider>
  );
};
