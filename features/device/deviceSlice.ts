import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Device {
    mac: string;
    password: string;
    deviceName: string;
    deviceNameInternal: string;
    deviceAddress: string;
    connString: string;
}

interface DeviceState {
    devices: Record<string, Device>; // Almacenar dispositivos usando MAC como clave
    currentDevice: Partial<Device>; // Permitir campos opcionales
    error: string | null; // Manejo de errores
}

const initialState: DeviceState = {
    devices: {},
    currentDevice: {
        mac: '',
        password: '',
        deviceName: '',
        deviceNameInternal: '',
        deviceAddress: '',
        connString: '',
    },
    error: null, // Inicialmente sin errores
};

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setConnString(state, action: PayloadAction<string>) {
            state.currentDevice.connString = action.payload;
            state.error = null; // Reiniciar error
        },
        setMac(state, action: PayloadAction<string>) {
            state.currentDevice.mac = action.payload;
            state.error = null; // Reiniciar error
            addDeviceIfComplete(state); // Comprobar si se puede agregar
        },
        setPassword(state, action: PayloadAction<string>) {
            state.currentDevice.password = action.payload;
            state.error = null; // Reiniciar error
            addDeviceIfComplete(state); // Comprobar si se puede agregar
        },
        setDeviceNameInternal(state, action: PayloadAction<string>) {
            state.currentDevice.deviceNameInternal = action.payload;
            state.error = null; // Reiniciar error
            addDeviceIfComplete(state); // Comprobar si se puede agregar
        },
        setDeviceName(state, action: PayloadAction<string>) {
            state.currentDevice.deviceName = action.payload;
            state.error = null; // Reiniciar error
            addDeviceIfComplete(state); // Comprobar si se puede agregar
        },
        setDeviceAddress(state, action: PayloadAction<string>) {
            state.currentDevice.deviceAddress = action.payload;
            state.error = null; // Reiniciar error
            addDeviceIfComplete(state); // Comprobar si se puede agregar
        },
        resetDevice(state) {
            state.currentDevice = {
                mac: '',
                password: '',
                deviceName: '',
                deviceNameInternal: '',
                deviceAddress: '',
                connString: '',
            };
            state.error = null; // Reiniciar error
        },
        removeDevice(state, action: PayloadAction<string>) {
            const macToRemove = action.payload;
            if (state.devices[macToRemove]) {
                delete state.devices[macToRemove]; // Eliminar dispositivo usando MAC
                console.log(`Dispositivo con MAC ${macToRemove} eliminado`);
            } else {
                state.error = `Error: No se encontró ningún dispositivo con la MAC ${macToRemove}`; // Establecer mensaje de error
            }
        },
    },
});

const addDeviceIfComplete = (state: DeviceState) => {
    const { mac, password, deviceName, deviceNameInternal, deviceAddress, connString } = state.currentDevice;

    // El deviceAddress es opcional

    if (mac && password && deviceName && deviceNameInternal && connString) {
       
        if (state.devices[mac]) {
            state.error = `Error: Ya existe un dispositivo con la MAC ${mac}`; 
            console.log(`Error: Ya existe un dispositivo con la MAC ${mac}`)
            return; 
        }

        state.devices[mac] = { ...state.currentDevice } as Device;

        state.currentDevice = {
            mac: '',
            password: '',
            deviceName: '',
            deviceNameInternal: '',
            deviceAddress: '',
            connString: '',
        };

        console.log("Agregando dispositivo");
    }
};

export const {
    setConnString,
    setMac,
    setPassword,
    resetDevice,
    setDeviceNameInternal,
    setDeviceName,
    setDeviceAddress,
    removeDevice, 
} = deviceSlice.actions;

export default deviceSlice.reducer;
