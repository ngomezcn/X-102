import { Device } from 'react-native-ble-plx';
import React, { useEffect, useState } from "react";
import { PermissionsAndroid, Alert, Button, View } from "react-native";

import { BLEManager } from '@/components/BluetoothService';
import { LogBox } from 'react-native';
import log from '@/components/logger'; // Importa el logger
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import AppContainer from './AppContainer';

LogBox.ignoreAllLogs(false); // Desactiva el filtrado de logs

const RootLayout: React.FC = () => {
  /*  const [scanning, setScanning] = useState(false);
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null); // Estado para almacenar el dispositivo conectado
    const [devices, setDevices] = useState<any[]>([]);
  
    log.info("Iniciando app");
  
    // Función para solicitar permisos
    const requestPermissions = async () => {
      const granted = await BLEManager.requestPermissions();
      if (!granted) {
        Alert.alert("Permisos no concedidos", "No se pueden escanear dispositivos sin permisos.");
        return false;
      }
      return true;
    };
  
    // Función para verificar el estado del Bluetooth
    const checkBluetoothStatus = async () => {
      return new Promise((resolve) => {
        BLEManager.manager.onStateChange((state) => {
          if (state === 'PoweredOn') {
            resolve(true);
          } else {
            resolve(false);
          }
        }, true);
      });
    };
  
    // Función para escanear dispositivos BLE cercanos
    const scanDevices = async () => {
      const permissionsGranted = await requestPermissions();
      if (!permissionsGranted) return;
  
      const isBluetoothOn = await checkBluetoothStatus();
      if (!isBluetoothOn) {
        Alert.alert("Bluetooth apagado", "Por favor, enciende el Bluetooth para escanear dispositivos.");
        return;
      }
  
      setDevices([]); // Limpiar dispositivos antes de escanear
      setScanning(true);
  
      BLEManager.scanForDevices(
        (device) => {
  
          setDevices(prevDevices => [...prevDevices, {id: device.id, x: "asd"}]);
  
          log.info("Dispositivo encontrado:", device);
  
        },
        (error) => {
          console.error("Error durante el escaneo:", error);
          Alert.alert("Error", "Ocurrió un error durante el escaneo.");
          setScanning(false);
        }
      );
  
      // Detener el escaneo después de 5 segundos
      setTimeout(() => {
        BLEManager.manager.stopDeviceScan();
        setScanning(false);
        log.info("Dispositivos actualizados:", devices);
      }, 5000); // 5 segundos de escaneo
    };
  
    // Función para conectarse al dispositivo con la MAC específica
    const connectToDevice = async (macAddress: string) => {
      if (connectedDevice) {
        Alert.alert("Ya estás conectado", "Ya estás conectado a un dispositivo.");
        return;
      }
  
      const permissionsGranted = await requestPermissions();
      if (!permissionsGranted) return;
  
      const isBluetoothOn = await checkBluetoothStatus();
      if (!isBluetoothOn) {
        Alert.alert("Bluetooth apagado", "Por favor, enciende el Bluetooth para conectarte.");
        return;
      }
  
      const deviceToConnect = devices.find(device => device.id === macAddress);
  
      log.info(devices)
  
      if (deviceToConnect) {
        try {
          const connectedDevice = await BLEManager.connectToDevice(deviceToConnect);
          setConnectedDevice(connectedDevice); // Guardar dispositivo conectado
          Alert.alert("Conexión exitosa", `Conectado a: ${deviceToConnect.name || 'Unnamed'} (${deviceToConnect.id})`);
        } catch (error) {
          Alert.alert("Error de conexión", `No se pudo conectar con el dispositivo: ${error.message}`);
        }
      } else {
        Alert.alert("Dispositivo no encontrado", "Por favor, escanea y selecciona un dispositivo válido.");
      }
    };
  
    // Función para enviar un dato a la característica del dispositivo conectado
    const sendData = async () => {
      if (!connectedDevice) {
        Alert.alert("Dispositivo no conectado", "Primero conecta el dispositivo.");
        return;
      }
  
      const dataToSend = "MiDato"; // Reemplazar con el dato a enviar
  
      try {
        await connectedDevice.writeCharacteristicWithResponseForService(
          TARGET_SERVICE_UUID,
          TARGET_CHARACTERISTIC_UUID,
          Buffer.from(dataToSend).toString('base64') // Convierte el dato a base64
        );
        Alert.alert("Dato enviado", `El dato "${dataToSend}" fue enviado con éxito.`);
      } catch (error) {
        Alert.alert("Error al enviar", `No se pudo enviar el dato: ${error.message}`);
      }
    };*/

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;
