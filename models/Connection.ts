// src/models/Connection.ts

import { ConnectionSpecifications, BLESpecifications, WiFiSpecifications } from '@/models/Specifications';

export interface IConnectionStrategy {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  sendCommand(command: string): Promise<void>;
  receiveData(): Promise<any>;
  getSpecifications(): ConnectionSpecifications;
}

// Implementación BLE
export class BLEConnection implements IConnectionStrategy {
  constructor(private specifications: BLESpecifications) {}

  async connect() {
    console.log(`Connecting to BLE device at ${this.specifications.mac} with PIN ${this.specifications.accessKey}`);
  }

  async disconnect() {
    console.log(`Disconnecting from BLE device at ${this.specifications.mac}`);
  }

  async sendCommand(command: string) {
    console.log(`Sending command "${command}" to BLE device`);
  }

  async receiveData() {
    console.log(`Receiving data from BLE device`);
  }

  getSpecifications(): BLESpecifications {
    return this.specifications;
  }
}

// Implementación WiFi
export class WiFiConnection implements IConnectionStrategy {
  constructor(private specifications: WiFiSpecifications) {}

  async connect() {
    console.log(`Connecting to WiFi network "${this.specifications.ssid}" on frequency ${this.specifications.frequency}`);
  }

  async disconnect() {
    console.log(`Disconnecting from WiFi network "${this.specifications.ssid}"`);
  }

  async sendCommand(command: string) {
    console.log(`Sending command "${command}" over WiFi`);
  }

  async receiveData() {
    console.log(`Receiving data from WiFi connection`);
  }

  getSpecifications(): WiFiSpecifications {
    return this.specifications;
  }
}
