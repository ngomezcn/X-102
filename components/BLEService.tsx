import { BleManager, Device, Characteristic } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';
import { useEffect, useState } from 'react';

class BLEServiceInstance {
    private manager: BleManager;
    private device: Device | null = null;
    private targetDeviceId: string | null = null; // ID del dispositivo a conectar

    constructor() {
        this.manager = new BleManager();
    }

    setMac(deviceId: string) {
        this.targetDeviceId = deviceId; // Guardar ID del dispositivo
    }

    async requestBluetoothPermission(): Promise<boolean> {
        if (Platform.OS === 'ios') {
            return true; // iOS permite el acceso sin permisos adicionales
        }
        
        const apiLevel = parseInt(Platform.Version.toString(), 10);
        
        if (apiLevel < 31) {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }

        const result = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        ]);

        return (
            result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
            result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
            result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
        );
    }

    async connect() {
        if (!this.targetDeviceId) {
            throw new Error('Device MAC address not set');
        }

        const permissionGranted = await this.requestBluetoothPermission();
        if (!permissionGranted) {
            throw new Error('Permissions not granted');
        }

        // Esperar hasta que el estado sea "PoweredOn"
        return new Promise((resolve, reject) => {
            const subscription = this.manager.onStateChange((state) => {
                if (state === 'PoweredOn') {
                    this.scanAndConnect()
                        .then((device) => {
                            resolve(device);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                    subscription.remove();
                }
            }, true);
        });
    }

    private async scanAndConnect() {
        return new Promise<Device>((resolve, reject) => {
            this.manager.startDeviceScan(null, null, (error, device) => {
                if (error) {
                    this.manager.stopDeviceScan();
                    reject(error);
                    return;
                }

                // Verificamos que el dispositivo no sea null y que coincida con el ID objetivo
                if (device && device.id === this.targetDeviceId) {
                    this.manager.stopDeviceScan();
                    this.device = device;

                    device
                        .connect()
                        .then((connectedDevice) => {
                            return connectedDevice.discoverAllServicesAndCharacteristics();
                        })
                        .then((connectedDevice) => {
                            resolve(connectedDevice);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }
            });
        });
    }

    async writeData(serviceUUID: string, characteristicUUID: string, data: string) {
        if (!this.device) {
            throw new Error('Device not connected');
        }

        // Convertir datos a un Buffer
        const buffer = Buffer.from(data, 'utf-8');

        return this.manager.writeCharacteristicWithResponseForDevice(
            this.device.id,
            serviceUUID,
            characteristicUUID,
            buffer.toString('base64')
        );
    }

    async readData(serviceUUID: string, characteristicUUID: string): Promise<string> {
        if (!this.device) {
            throw new Error('Device not connected');
        }

        const characteristic: Characteristic = await this.manager.readCharacteristicForDevice(
            this.device.id,
            serviceUUID,
            characteristicUUID
        );

        // Decodificar el valor de la característica
        //////const value = Buffer.from(characteristic.value, 'base64').toString('utf-8');
        //////return value;
        return "";
    }

    // Método para limpiar y destruir el manager cuando ya no se necesite
    destroy() {
        this.manager.destroy();
    }
}

// Exportar una instancia del servicio BLE
export const BLEService = new BLEServiceInstance();

// Hook para utilizar el servicio en componentes de React
export const useBLEService = () => {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            BLEService.destroy(); // Limpiar en desmontaje
        };
    }, []);

    return { error, setMac: BLEService.setMac.bind(BLEService), connect: BLEService.connect.bind(BLEService) };
};