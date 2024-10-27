// src/store/deviceWizardSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConnectionSpecifications, BLESpecifications, WiFiSpecifications } from '@/models/Specifications';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { IotDevice } from '@/models/IoTDevice';
import { BLEConnection, WiFiConnection } from '@/models/Connection';

const initialState: IotDevice = {
  id: '', // se asignará en el primer paso del wizard
};

export const deviceWizardSlice = createSlice({
  name: 'deviceWizard',
  initialState,
  reducers: {
    startWizard: (state) => {
      // Inicializamos el id y limpiamos cualquier estado previo
      state.id = uuidv4();
      state.type = undefined;
      state.name = undefined;
      state.location = undefined;
      state.internalDeviceName = undefined;
      state.connectionString = undefined;

      state.specifications = undefined;
      state.connectionStrategy = undefined;
    },
    setDeviceName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDeviceLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setInternalDeviceName: (state, action: PayloadAction<string>) => {
      state.internalDeviceName = action.payload;
    },
    setConnectionString: (state, action: PayloadAction<string>) => {
      state.connectionString = action.payload;
    },
    setConnectionType: (state, action: PayloadAction<string>) => { //(state, action: PayloadAction<'BLE' | 'WiFi'>) => {
      state.type = action.payload;
    },
    setConnectionStrategy: (state, action: PayloadAction<BLEConnection | WiFiConnection>) => {
      state.connectionStrategy = action.payload;
      state.specifications = action.payload.getSpecifications();
    },
    resetWizard: (state) => {
      state.id = '';
      state.name = undefined;
      state.location = undefined;
      state.internalDeviceName = undefined;
      state.connectionString = undefined;
      state.type = undefined;
      state.specifications = undefined;
    },
  },
});

export const { startWizard, setDeviceName, setDeviceLocation, setInternalDeviceName, setConnectionString, setConnectionType, setConnectionStrategy, resetWizard } = deviceWizardSlice.actions;
export default deviceWizardSlice.reducer;
