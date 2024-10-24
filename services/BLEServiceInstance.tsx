import { BleManager, Device, Characteristic, BleError } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import log from '../utils/logger';
import { Base64 } from 'js-base64';

class BLEServiceInstance {
  private manager: BleManager;
  private device: Device | null;
  private macAddress: string | null;

  constructor() {
    this.manager = new BleManager();
    this.device = null;
    this.macAddress = null;
  }

  // 1. Setear la MAC del dispositivo
  public setMac(macAddress: string): void {
    this.macAddress = macAddress;
  }

  // 2. Pedir permisos de Bluetooth (necesario para Android)
  async requestBluetoothPermissions(): Promise<boolean> {
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

  public async scanForDevice() {
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

        if (device && device.id === this.macAddress) {
          log.debug(`Device found: ${device.id}`);
          deviceFound = true; // Marcar que el dispositivo fue encontrado
          this.manager.stopDeviceScan();
          this.device = device;
          clearTimeout(timeout); // Limpiar el timeout si se encuentra el dispositivo

          resolve(device); // Resuelve la promesa con el dispositivo encontrado
        }
      });
    });
  }

  public async receiveDataFromDevice(serviceUUID: string, characteristicUUID: string): Promise<string> {
    if (!this.device) {
      throw new Error('No hay dispositivo conectado');
    }
  
    try {
      // Leer la característica especificada del dispositivo BLE
      const characteristic: Characteristic = await this.device.readCharacteristicForService(
        serviceUUID, 
        characteristicUUID
      );
      
      // Decodificar los datos de base64 a texto
      const decodedData = Base64.decode(characteristic.value || '');
      
      log.debug(`Datos recibidos de ${characteristicUUID}: ${decodedData}`);
      
      return decodedData;
    } catch (error) {
      if (error instanceof BleError) {
        throw new Error(
          `Error al recibir datos: Código: ${error.errorCode}, Razón: ${error.reason}`
        );
      } else {
        throw new Error('Error desconocido al recibir datos del dispositivo');
      }
    }
  }

  // 4. Conectarse al dispositivo
  public async connectToDevice(): Promise<Device> {
    if (!this.device) {
      throw new Error('No hay dispositivo disponible para conectar');
    }

    try {
      const connectedDevice = await this.device.connect();

      await connectedDevice.discoverAllServicesAndCharacteristics();
      const services = await connectedDevice.services();
      log.info("XDDDDDD")
      log.info(services)

      this.device = connectedDevice;
      return connectedDevice;
    } catch (error) {
      // Manejamos el error si es de tipo BleError
      if (error instanceof BleError) {
        throw new Error(
          `Error al conectar con el dispositivo: Código: ${error.errorCode}, Razón: ${error.reason}`
        );
      } else {
        throw new Error('Error desconocido al conectar con el dispositivo');
      }
    }
  }

  // 5. Enviar un string y esperar respuesta del dispositivo
  public async sendCommand(
    serviceUUID: string,
    characteristicUUID: string,
    command: string
  ): Promise<string> {
    if (!this.device) {
      throw new Error('No hay dispositivo conectado');
    }

    try {
      // Escribimos el comando en el dispositivo
      console.info('Enviando...');

      await this.device.writeCharacteristicWithResponseForService(
        serviceUUID, characteristicUUID, command
      );
      console.info('Comando enviado con éxito');

     return ""
    } catch (error) {
      // Manejamos el error si es de tipo BleError
      if (error instanceof BleError) {
        throw new Error(
          `Error al enviar comando: Código: ${error.errorCode}, Razón: ${error.reason}`
        );
      } else {
        throw new Error('Error desconocido al enviar comando');
      }
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
export const BLEService = new BLEServiceInstance();
