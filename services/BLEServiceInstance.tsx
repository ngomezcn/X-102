import { BleManager, Device, Characteristic } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import log from '../utils/logger';

class BLEServiceInstance {
    private manager: BleManager;
    private device: Device | null = null;
    private targetDeviceId: string | null = null; // ID del dispositivo a conectar

    constructor() {
        this.manager = new BleManager();
        log.debug('BLEServiceInstance initialized');
    }

    setMac(deviceId: string) {
        this.targetDeviceId = deviceId; // Guardar ID del dispositivo
        log.debug(`Device MAC set to: ${deviceId}`);
    }

    async requestBluetoothPermission(): Promise<boolean> {
        log.debug('Requesting Bluetooth permission');
        
        if (Platform.OS === 'ios') {
            log.debug('Platform is iOS, no additional permissions required');
            return true; // iOS permite el acceso sin permisos adicionales
        }
        
        const apiLevel = parseInt(Platform.Version.toString(), 10);
        log.debug(`API Level: ${apiLevel}`);
        
        if (apiLevel < 31) {
            log.debug('Requesting ACCESS_FINE_LOCATION permission');
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            const result = granted === PermissionsAndroid.RESULTS.GRANTED;
            log.debug(`Location permission granted: ${result}`);
            return result;
        }

        log.debug('Requesting multiple Bluetooth permissions');
        const result = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        ]);

        const allPermissionsGranted = (
            result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
            result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
            result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
        );

        log.debug(`All permissions granted: ${allPermissionsGranted}`);
        return allPermissionsGranted;
    }

    async connect() {
        log.debug('Attempting to connect');

        if (!this.targetDeviceId) {
            const error = 'Device MAC address not set';
            log.debug(error);
            throw new Error(error);
        }

        const permissionGranted = await this.requestBluetoothPermission();
        if (!permissionGranted) {
            const error = 'Permissions not granted';
            log.debug(error);
            throw new Error(error);
        }

        log.debug('Waiting for Bluetooth state to be PoweredOn');
        return new Promise((resolve, reject) => {
            const subscription = this.manager.onStateChange((state) => {
                log.debug(`Bluetooth state changed: ${state}`);
                if (state === 'PoweredOn') {
                    this.scanAndConnect()
                        .then((device) => {
                            log.debug(`Device connected: ${device.id}`);
                            resolve(device);
                        })
                        .catch((error) => {
                            log.debug(`Error during scan and connect: ${error.message}`);
                            reject(error);
                        });
                    subscription.remove();
                }
            }, true);
        });
    }

    private async scanAndConnect() {
        log.debug('Starting scan for devices');
        return new Promise<Device>((resolve, reject) => {
            let deviceFound = false; // Para indicar si se encontró el dispositivo
            const timeout = setTimeout(() => {
                if (!deviceFound) {
                    this.manager.stopDeviceScan();
                    const error = 'No device found within the timeout';
                    log.debug(error);
                    reject(new Error(error));
                }
            }, 10000); // Esperar 10 segundos (10000 ms)
    
            this.manager.startDeviceScan(null, null, (error, device) => {
                if (error) {
                    clearTimeout(timeout); // Limpiar el timeout si hay error
                    this.manager.stopDeviceScan();
                    log.debug(`Error during scan: ${error.message}`);
                    reject(error);
                    return;
                }

                if (device && device.id === this.targetDeviceId) {
                    log.debug(`Device found: ${device.id}`);
                    deviceFound = true; // Marcar que el dispositivo fue encontrado
                    clearTimeout(timeout); // Limpiar el timeout si se encuentra el dispositivo
                    this.manager.stopDeviceScan();
                    this.device = device;
    
                    device
                        .connect()
                        .then((connectedDevice) => {
                            log.debug(`Device connected: ${connectedDevice.id}`);
                            return connectedDevice.discoverAllServicesAndCharacteristics();
                        })
                        .then((connectedDevice) => {
                            log.debug('All services and characteristics discovered');
                            resolve(connectedDevice);
                        })
                        .catch((error) => {
                            log.debug(`Error during connection: ${error.message}`);
                            reject(error);
                        });
                }
            });
        });
    }

    async writeCharacteristic(serviceUUID: string, characteristicUUID: string, value: string) {
        log.debug('Attempting to write characteristic');
    
        if (!this.device) {
            const error = 'Device not connected';
            log.debug(error);
            throw new Error(error);
        }
    
        try {
            await this.device.writeCharacteristicWithResponseForService(serviceUUID, characteristicUUID, value);
            log.debug('Write characteristic success');
        } catch (error) {
            log.debug(`Error writing characteristic: ${error}`);
            throw error;
        }
    }

    async disconnect() {
        log.debug('Attempting to disconnect from device');
        
        if (!this.device) {
            log.debug('No device currently connected');
            return; // Si no hay un dispositivo conectado, simplemente retornamos
        }

        try {
            await this.device.cancelConnection();
            log.debug(`Device ${this.device.id} disconnected successfully`);
            this.device = null; // Limpiamos el estado del dispositivo
        } catch (error) {
            log.debug(`Error while disconnecting from device: ${error}`);
            throw error; // Opcional: Lanzamos el error si es necesario manejarlo en otra parte
        }
    }

    // Método para limpiar y destruir el manager cuando ya no se necesite
    destroy() {
        if (this.device) {
            log.debug('Disconnect BLE');
            this.disconnect()
        }
       
        log.debug('Destroying BLE manager');
        this.manager.destroy();
    }
}

// Exportar una instancia del servicio BLE
//export const BLEService = new BLEServiceInstance();
