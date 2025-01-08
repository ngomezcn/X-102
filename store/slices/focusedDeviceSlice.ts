import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IotDevice } from '@/models/IoTDevice';

interface FocusedDeviceState {
  device: IotDevice | null;
  status: 'idle' | 'success' | 'error' | 'loading';
}

const initialState: FocusedDeviceState = {
  device: null,
  status: 'idle',
};

// Thunk para manejar el setFocusedDevice con notificación
export const setFocusedDeviceAsync = createAsyncThunk(
  'focusedDevice/setFocusedDeviceAsync',
  async (device: IotDevice | null) => {
    // Simula operaciones adicionales si es necesario
    return new Promise<IotDevice | null>((resolve) => {
      setTimeout(() => resolve(device), 500); // Simula un retardo
    });
  }
);

export const focusedDeviceSlice = createSlice({
  name: 'focusedDevice',
  initialState,
  reducers: {
    cleanFocusedDevice: (state) => {
      state.device = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setFocusedDeviceAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setFocusedDeviceAsync.fulfilled, (state, action: PayloadAction<IotDevice>) => {
        state.device = action.payload;
        state.status = 'success';
      })
      .addCase(setFocusedDeviceAsync.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { cleanFocusedDevice } = focusedDeviceSlice.actions;

export default focusedDeviceSlice.reducer;
