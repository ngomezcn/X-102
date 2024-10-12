// src/store/deviceSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeviceState {
    id: string;
    mac: string;
    pin: string;
    deviceName: string;
    deviceNameInternal: string;
    address: string;
    connString: string;
}

const initialState: DeviceState = {
    id: '',
    mac: '',
    pin: '',
    deviceName: '',
    deviceNameInternal: '',
    address: '',
    connString: '',
};

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setConnString(state, action: PayloadAction<string>) {
            state.connString = action.payload;
        },
        setMac(state, action: PayloadAction<string>) {
            state.mac = action.payload;
        },
        setPin(state, action: PayloadAction<string>) {
            state.pin = action.payload;
        },
        deviceNameInternal(state, action: PayloadAction<string>) {
            state.deviceNameInternal = action.payload;
        },
        resetDevice(state) {
            state.connString = '';
            state.mac = '';
            state.pin = '';
        },
    },
});

export const { setConnString, setMac, setPin, resetDevice, deviceNameInternal } = deviceSlice.actions;

export default deviceSlice.reducer;
