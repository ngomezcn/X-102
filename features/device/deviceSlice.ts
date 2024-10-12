// src/store/deviceSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeviceState {
  mac: string;
  pin: string;
  accessCode: string;
}

const initialState: DeviceState = {
  mac: '',
  pin: '',
  accessCode: '',
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setAccessCode(state, action: PayloadAction<string>) {
      state.accessCode = action.payload;
    },
    setMac(state, action: PayloadAction<string>) {
      state.mac = action.payload;
    },
    setPin(state, action: PayloadAction<string>) {
      state.pin = action.payload;
    },
    resetDevice(state) {
      state.accessCode = '';
      state.mac = '';
      state.pin = '';
    },
  },
});

export const { setAccessCode, setMac, setPin, resetDevice } = deviceSlice.actions;

export default deviceSlice.reducer;
