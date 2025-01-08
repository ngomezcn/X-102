import { BleManager, Device, Characteristic, BleError } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import log from '../utils/logger';
import { Base64 } from 'js-base64';
import PermissionsService from './PermissionsService';

export class BleHandler {
  private manager: BleManager;
  private device: Device | null;
  private macAddress: string | null;

  constructor() {
    this.manager = new BleManager();
    this.device = null;
    this.macAddress = null;
    log.debug('BLEServiceInstance inicializado.');
  }

  public resetManager(): void {
    this.manager.destroy(); // Destruye el estado interno
    this.manager = new BleManager(); // Crea una nueva instancia limpia
  }

  // 1. Setear la MAC del dispositivo
  public setMac(macAddress: string): void {
    this.macAddress = macAddress;
    log.debug(`MAC Address seteada: ${macAddress}`);
  }

  // 2. Pedir permisos de Bluetooth (necesario para Android)
  async requestBluetoothPermissions(): Promise<boolean> {
      log.debug('Solicitando permisos de Bluetooth...');
      const allPermissionsGranted = await PermissionsService.requestAllPermissions();
      log.debug(`Permisos otorgados: ${allPermissionsGranted}`);
      return allPermissionsGranted;
  }

  public async scanForDevice() {
    log.debug('Iniciando escaneo para dispositivos');
  
    return new Promise<Device>((resolve, reject) => {
      let found = false;
      const timeout = setTimeout(() => {
        if (!found) {
          log.debug('Tiempo límite alcanzado. Finalizando escaneo.');
          this.manager.stopDeviceScan();
          reject(new Error('No se encontró el dispositivo dentro del tiempo límite'));
        }
      }, 15000); // 10 segundos de espera
  
      this.manager.startDeviceScan(null, null, (error, device) => {
        log.debug('Escaneo en progreso...');

        if (error) {
          log.error('Error durante el escaneo:', error);
          clearTimeout(timeout);
          this.manager.stopDeviceScan();
          reject(error);
          return;
        }
  
        log.debug(`Dispositivo detectado: ${device?.name || 'Desconocido'}, ID: ${device?.id}`);

        if (device && device.id === this.macAddress) {
          log.debug(`Dispositivo encontrado: ${device.name || 'Desconocido'}, ID: ${device.id}`);
          found = true;
          clearTimeout(timeout);
          this.manager.stopDeviceScan();
          this.device = device;
          resolve(device);
        }
      });
    });
  }

  public async receiveDataFromDevice(serviceUUID: string, characteristicUUID: string): Promise<string> {
    if (!this.device) {
      log.error('Intento de recibir datos sin dispositivo conectado.');
      throw new Error('No hay dispositivo conectado');
    }
  
    try {
      log.debug(`Leyendo característica: Servicio: ${serviceUUID}, Característica: ${characteristicUUID}`);
      const characteristic: Characteristic = await this.device.readCharacteristicForService(
        serviceUUID, 
        characteristicUUID
      );
      
      const decodedData = Base64.decode(characteristic.value || '');
      log.debug(`Datos recibidos de ${characteristicUUID}: ${decodedData}`);
      
      return decodedData;
    } catch (error) {
      log.error('Error al recibir datos:', error);
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
      log.error('Intento de conectar sin dispositivo disponible.');
      throw new Error('No hay dispositivo disponible para conectar');
    }
  
    try {
      log.debug('Intentando conectar al dispositivo...');
      await this.disconnect();
      const connectedDevice = await this.device.connect();
      log.debug('Conexión establecida. Descubriendo servicios y características...');
      await connectedDevice.discoverAllServicesAndCharacteristics();
  
      this.manager.onDeviceDisconnected(connectedDevice.id, (error, device) => {
        if (error) {
          log.error(`Desconexión inesperada del dispositivo ${device?.id || 'desconocido'}:`, error);
        } else {
          log.debug(`El dispositivo ${device?.id || 'desconocido'} se ha desconectado.`);
        }
        this.device = null;
      });
  
      this.device = connectedDevice;
      log.debug('Dispositivo conectado y listo.');
      return connectedDevice;
    } catch (error) {
      log.error('Error al conectar con el dispositivo:', error);
      if (error instanceof BleError) {
        throw new Error(
          `Error al conectar con el dispositivo: Código: ${error.errorCode}, Razón: ${error.reason}`
        );
      }
      throw new Error('Error desconocido al conectar con el dispositivo');
    }
  }
  

  // 5. Enviar un string y esperar respuesta del dispositivo
  public async sendCommand(
    serviceUUID: string,
    characteristicUUID: string,
    command: string
  ): Promise<string> {
    if (!this.device) {
      log.error('Intento de enviar comando sin dispositivo conectado.');
      throw new Error('No hay dispositivo conectado');
    }

    try {
      log.debug(`Enviando comando: ${command} al servicio ${serviceUUID}, característica ${characteristicUUID}`);
      await this.device.writeCharacteristicWithResponseForService(
        serviceUUID, characteristicUUID, command
      );
      log.debug('Comando enviado con éxito.');
      return "";
    } catch (error) {
      log.error('Error al enviar comando:', error);
      if (error instanceof BleError) {
        throw new Error(
          `Error al enviar comando: Código: ${error.errorCode}, Razón: ${error.reason}`
        );
      } else {
        throw new Error('Error desconocido al enviar comando');
      }
    }
  }

  public async disconnect(): Promise<void> {
    if (this.device) {
      try {
        await this.device.cancelConnection();
        log.debug(`Dispositivo ${this.device.id} desconectado con éxito`);
        this.device = null;
      } catch (error) {
        log.error('Error al desconectar el dispositivo:', error);
      }
    }
  }

  public destroy(): void {
    if (this.device) {
      this.disconnect();
    }
    this.manager.destroy();
  }
}
