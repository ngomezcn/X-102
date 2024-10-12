// src/store/deviceSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeviceState {
  name: string;
  address: string | null; // Cambiado a string | null
  mac: string;
  pin: string;
  timestamp: string | null; // Puede ser null si aún no se ha establecido
}

const initialState: DeviceState = {
  name: '',
  address: null, // Inicialmente null
  mac: '',
  pin: '',
  timestamp: null,
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setAddress(state, action: PayloadAction<string | null>) { // Acepta null
      state.address = action.payload; // Puede ser null o una cadena
    },
    setMac(state, action: PayloadAction<string>) {
      state.mac = action.payload;
    },
    setPin(state, action: PayloadAction<string>) {
      state.pin = action.payload;
    },
    setTimestamp(state, action: PayloadAction<string>) {
      state.timestamp = action.payload;
    },
    resetDevice(state) {
      return initialState; // Restablece el estado al inicial
    },
  },
});

// Exportar las acciones
export const {
  setName,
  setAddress,
  setMac,
  setPin,
  setTimestamp,
  resetDevice,
} = deviceSlice.actions;

// Exportar el reductor
export default deviceSlice.reducer;
