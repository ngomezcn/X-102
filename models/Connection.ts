// Interfaz base para las conexiones
export interface IConnectionStrategy {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendCommand(command: string): Promise<void>;
    receiveData(): Promise<any>;
    getSpecifications(): Record<string, any>;
  }
  
  // Clase de conexión BLE, con address dentro de specifications
  export class BLEConnection implements IConnectionStrategy {
    constructor(private specifications: Record<string, any>) {}
  
    async connect() {
      // Lógica específica para BLE
    }
  
    async disconnect() {
      // Lógica específica para desconectar BLE
    }
  
    async sendCommand(command: string) {
      // Enviar comando por BLE
    }
  
    async receiveData() {
      // Recibir datos de BLE
    }
  
    getSpecifications() {
      return this.specifications;
    }
  }
  
  // Otras clases de conexión (WiFi, Bluetooth Classic) pueden seguir el mismo patrón.
  