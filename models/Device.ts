import { IConnectionStrategy } from './Connection';

export interface Device {
  id: string; // Identificador único
  name: string;
  connectionType: string; // Identificador de tipo de conexión, por ejemplo, 'BLE' o 'WiFi'
  connectionStrategy: IConnectionStrategy;
  specifications: Record<string, any>; // Almacena información específica de cada conexión
}
