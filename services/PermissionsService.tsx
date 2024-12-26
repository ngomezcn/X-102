import { PermissionsAndroid, Platform } from 'react-native';
import log from '../utils/logger';

class PermissionsService {
  /**
   * Solicita permisos necesarios para Bluetooth.
   */
  public static async requestBluetoothPermissions(): Promise<boolean> {
    log.debug('Requesting Bluetooth permission');

    if (Platform.OS === 'ios') {
      log.debug('Platform is iOS, no additional permissions required');
      return true; // iOS permite el acceso sin permisos adicionales
    }

    const apiLevel = parseInt(Platform.Version.toString(), 10);
    log.debug(`API Level: ${apiLevel}`);

    if (apiLevel < 31) {
      log.debug('Requesting ACCESS_FINE_LOCATION permission');
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      const result = granted === PermissionsAndroid.RESULTS.GRANTED;
      log.debug(`Location permission granted: ${result}`);
      return result;
    }

    log.debug('Requesting multiple Bluetooth permissions');
    const result = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);

    const allPermissionsGranted =
      result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
      result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
      result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED;

    log.debug(`All permissions granted: ${allPermissionsGranted}`);
    return allPermissionsGranted;
  }

  /**
   * Solicita permisos para acceder a la cámara.
   */
  public static async requestCameraPermission(): Promise<boolean> {
    log.debug('Requesting Camera permission');

    if (Platform.OS === 'ios') {
      log.debug('Platform is iOS, no additional permissions required');
      return true; // iOS maneja permisos automáticamente
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );

    const result = granted === PermissionsAndroid.RESULTS.GRANTED;
    log.debug(`Camera permission granted: ${result}`);
    return result;
  }

  /**
   * Solicita permisos combinados para Bluetooth y cámara.
   */
  public static async requestAllPermissions(): Promise<boolean> {
    const bluetoothPermission = await this.requestBluetoothPermissions();
    const cameraPermission = await this.requestCameraPermission();

    const allPermissionsGranted = bluetoothPermission && cameraPermission;
    log.debug(`All combined permissions granted: ${allPermissionsGranted}`);
    return allPermissionsGranted;
  }
}

export default PermissionsService;
