import { BleManager, Device } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';
import  log  from "@/components/logger";

export class BLEManagerService {
  manager: BleManager;
  devices: Device[]; // Array para almacenar dispositivos encontrados

  constructor() {
    this.manager = new BleManager();
    this.devices = []; // Inicializamos el array de dispositivos
  }

  // Solicitar permisos de Bluetooth en Android
  async requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      return true; // No necesitas permisos adicionales en iOS
    }

    if (Platform.OS === 'android') {
      const apiLevel = typeof Platform.Version === 'string'
        ? parseInt(Platform.Version, 10)
        : Platform.Version;

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
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
    }

    return false;
  }

  // Esperar a que el Bluetooth esté encendido
  waitForBluetoothToBePoweredOn(callback: () => void): () => void {
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        callback();
        subscription.remove(); // Detener el listener cuando ya no es necesario
      }
    }, true);

    return () => subscription.remove(); // Función de limpieza para el listener
  }

  // Escanear dispositivos BLE
  scanForDevices(
    onDeviceFound: (device: Device) => void,
    onError: (error: Error) => void
  ): void {
    this.devices = []; // Limpiar el array antes de comenzar a escanear
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        onError(error);
        return;
      }

      // Agregar todos los dispositivos encontrados al array
      if (device) {

        this.devices.push(device); // Agregar el dispositivo encontrado al array
        onDeviceFound(device); // Devolver el dispositivo encontrado
      }
    });
  }

  // Función para listar todos los dispositivos encontrados
  listDevices(): Device[] {
    return this.devices; // Retornar la lista de dispositivos encontrados
  }

  // Conectar a un dispositivo
  async connectToDevice(device: Device): Promise<Device> {
    try {
      const connectedDevice = await device.connect();
      await connectedDevice.discoverAllServicesAndCharacteristics();
      return connectedDevice;
    } catch (error) {
      throw new Error("Error al conectar con el dispositivo: " + error);
    }
  }

  // Leer una característica
  async readCharacteristic(
    device: Device,
    serviceUUID: string,
    characteristicUUID: string
  ): Promise<string> {
    try {
      const characteristic = await device.readCharacteristicForService(serviceUUID, characteristicUUID);
      return characteristic.value || "no hay nada bro";
    } catch (error) {
      throw new Error("Error al leer la característica: " + error);
    }
  }
}

// Exportamos una única instancia de la clase para que sea un Singleton
export const BLEManager = new BLEManagerService();
