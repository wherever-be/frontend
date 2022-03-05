import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Application from './reducers/application/Application';
import configureStore from './global/configureStore';
import GlobalStyle from './global/GlobalStyle';
import './global/fonts';
import './assets/i18n';

const { store, persistor } = configureStore();

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <Application />
      </PersistGate>
    </Provider>
  );
};
