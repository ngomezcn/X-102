import { Device } from 'react-native-ble-plx';
import React, { useEffect, useState } from "react";
import { PermissionsAndroid, Alert, Button, View } from "react-native";

import { LogBox } from 'react-native';
import log from '@/utils/logger'; // Importa el logger
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../store/store';
import AppContainer from './AppContainer';
import { Text } from '@/components/ui/text';
import { HeadingProvider } from '@/hooks/useHeading';

LogBox.ignoreAllLogs(false);

const RootLayout: React.FC = () => {

  return (
    <HeadingProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    </HeadingProvider>
  );
};

export default RootLayout;
