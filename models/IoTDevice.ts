// src/models/Device.ts

import { IConnectionStrategy } from './Connection';
import { ConnectionSpecifications } from '@/models/Specifications';

export interface IotDevice {
  id: string;
  type?: string | null;
  name?: string | null;
  location?: string | null;
  internalDeviceName?: string | null;
  connectionString?: string | null;
  connectionStrategy?: IConnectionStrategy | null;
  specifications?: ConnectionSpecifications | null;
}