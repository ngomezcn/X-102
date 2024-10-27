// src/models/Device.ts

import { IConnectionStrategy } from './Connection';
import { ConnectionSpecifications } from '@/models/Specifications';

export interface IotDevice {
  id: string;
  type?: string;
  name?: string;
  location?: string;
  internalDeviceName?: string;
  connectionString?: string;

  connectionStrategy?: IConnectionStrategy;
  specifications?: ConnectionSpecifications;
}
