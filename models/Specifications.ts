// src/models/Specifications.ts

// Especificaciones para una conexión BLE
export interface BLESpecifications {
    type: 'BLE';
    mac?: string;
    accessKey?: string;
  }
  
  // Especificaciones para una conexión WiFi
  export interface WiFiSpecifications {
    type: 'WiFi';
    ssid?: string;
    password?: string;
    frequency?: number;
  }
  
  // Tipo discriminado que abarca todas las posibles especificaciones
  export type ConnectionSpecifications = BLESpecifications | WiFiSpecifications;
  