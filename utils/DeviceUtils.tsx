import { IotDevice } from '@/models/IoTDevice';

export const deviceExists = (devices: IotDevice[], connectionString: string): boolean => {
  return devices.some(device => device.connectionString === connectionString);
};
// deviceUtils.js

export const getSingleDevice = (devices: IotDevice[]): IotDevice | null | undefined => {
  if (devices.length === 0) {
    return null;
  } else {
    return devices[0];
  }
};