import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Device {
    mac: string;
    pin: string;
    deviceName: string;
    deviceNameInternal: string;
    deviceAddress: string;
    connString: string;
}

interface DeviceState {
    devices: Device[];
    currentDevice: Partial<Device>; // Permitir campos opcionales
}

const initialState: DeviceState = {
    devices: [],
    currentDevice: {
        mac: '',
        pin: '',
        deviceName: '',
        deviceNameInternal: '',
        deviceAddress: '',
        connString: '',
    },
};

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setConnString(state, action: PayloadAction<string>) {
            state.currentDevice.connString = action.payload;
        },
        setMac(state, action: PayloadAction<string>) {
            state.currentDevice.mac = action.payload;
            addDeviceIfComplete(state); // Comprobar si se puede agregar
        },
        setPin(state, action: PayloadAction<string>) {
            state.currentDevice.pin = action.payload;
            addDeviceIfComplete(state); // Comprobar si se puede agregar
        },
        setDeviceNameInternal(state, action: PayloadAction<string>) {
            state.currentDevice.deviceNameInternal = action.payload;
            addDeviceIfComplete(state); // Comprobar si se puede agregar
        },
        setDeviceName(state, action: PayloadAction<string>) {
            state.currentDevice.deviceName = action.payload;
            addDeviceIfComplete(state); // Comprobar si se puede agregar
        },
        setDeviceAddress(state, action: PayloadAction<string>) {
            state.currentDevice.deviceAddress = action.payload;
            addDeviceIfComplete(state); // Comprobar si se puede agregar
        },
        resetDevice(state) {
            state.currentDevice = {
                mac: '',
                pin: '',
                deviceName: '',
                deviceNameInternal: '',
                deviceAddress: '',
                connString: '',
            };
        },
    },
});

// Función auxiliar para comprobar si se puede agregar el dispositivo
const addDeviceIfComplete = (state: DeviceState) => {
    const { mac, pin, deviceName, deviceNameInternal, deviceAddress, connString } = state.currentDevice;

    // Verificar si todos los campos están completos
    if (mac && pin && deviceName && deviceNameInternal && deviceAddress && connString) {
        // Agregar a la lista de dispositivos
        state.devices.push({ ...state.currentDevice } as Device);
        // Reiniciar el dispositivo actual
        state.currentDevice = {
            mac: '',
            pin: '',
            deviceName: '',
            deviceNameInternal: '',
            deviceAddress: '',
            connString: '',
        };

        console.log("Agregando dispositov")

    }

};

export const {
    setConnString,
    setMac,
    setPin,
    resetDevice,
    setDeviceNameInternal,
    setDeviceName,
    setDeviceAddress
} = deviceSlice.actions;

export default deviceSlice.reducer;
