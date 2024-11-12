import { IotDevice } from '@/models/IoTDevice';

export const deviceExists = (devices: IotDevice[], connectionString: string): boolean => {
  return devices.some(device => device.connectionString === connectionString);
};
// deviceUtils.js

export const getDeviceOrNull = (devices: IotDevice[]): IotDevice | undefined => {
  if (devices.length === 0) {
    return undefined;
  } else {
    return devices[0];
  }
};