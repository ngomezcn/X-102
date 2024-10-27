// src/store/deviceSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IotDevice } from '@/models/IoTDevice';

export interface DeviceState {
  devices: IotDevice[];
}

const initialState: DeviceState = {
  devices: [],
};

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    addDevice: (state, action: PayloadAction<IotDevice>) => {
      state.devices.push(action.payload);
    },
    completeWizardDevice: (state, action: PayloadAction<IotDevice>) => {
      state.devices.push(action.payload);
    },
    removeDevice: (state, action: PayloadAction<string>) => {
      state.devices = state.devices.filter(device => device.id !== action.payload);
    },
    updateDevice: (state, action: PayloadAction<IotDevice>) => {
      const index = state.devices.findIndex(device => device.id === action.payload.id);
      if (index !== -1) {
        state.devices[index] = action.payload; // Reemplazamos el dispositivo encontrado
      }
    },
  },
});

export const { addDevice, completeWizardDevice, removeDevice, updateDevice } = deviceSlice.actions;
export default deviceSlice.reducer;
