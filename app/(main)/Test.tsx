import React, { useState } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import { useBLEService } from '@/hooks/useBLEService'; // Asegúrate de ajustar la ruta
import { Base64 } from 'js-base64';
import { Characteristic } from 'react-native-ble-plx';

const Test: React.FC = () => {
  const BLEService = useBLEService(); // Usamos el servicio BLE
  const [deviceInfo, setDeviceInfo] = useState<string | null>(null); // Información del dispositivo encontrado
  const [response, setResponse] = useState<string | null>(null); // Respuesta del comando
  const [receivedData, setReceivedData] = useState<string | null>(null); // Datos recibidos
  const [connected, setConnected] = useState(false); // Estado de la conexión

  const serviceUUID = '4c491e6a-38df-4d0f-b04b-8704a40071ce'; // Reemplaza con tu UUID de servicio
  const characteristicUUID = 'b0726341-e52e-471b-9cd6-4061e54616cc'; // Reemplaza con tu UUID de característica

  // Función para pedir permisos de Bluetooth
  const requestPermissions = async () => {
    try {
      const granted = await BLEService.requestBluetoothPermissions();
      if (granted) {
        Alert.alert('Permisos concedidos');
      } else {
        Alert.alert('Permisos no concedidos');
      }
    } catch (error: any) {
      Alert.alert('Error al solicitar permisos', error.message);
    }
  };

  // Función para escanear y encontrar el dispositivo
  const scanForDevice = async () => {
    BLEService.setMac('A8:03:2A:22:87:7E'); // Reemplaza esta MAC con la correcta

    try {
      const device = await BLEService.scanForDevice();
      setDeviceInfo(`Dispositivo encontrado: ${device.name || device.id}`);
      Alert.alert('Dispositivo encontrado', `Nombre: ${device.name}`);
    } catch (error: any) {
      Alert.alert('Error al escanear', error.message);
    }
  };

  // Función para conectar al dispositivo
  const connectToDevice = async () => {
    try {
      const connectedDevice = await BLEService.connectToDevice();
      setConnected(true);
      Alert.alert('Conexión exitosa', `Conectado a: ${connectedDevice.name || connectedDevice.id}`);
    } catch (error: any) {
      Alert.alert('Error al conectar', error.message);
    }
  };

  // Función para enviar un comando
  const sendCommandToDevice = async () => {

    const command = Base64.encode('AR=4321');

    try {
      await BLEService.sendCommand(serviceUUID, characteristicUUID, command);
      Alert.alert('Comando enviado');
    } catch (error: any) {
      Alert.alert('Error al enviar comando', error.message);
    }
  };

  // Función para recibir la respuesta
  const receiveResponseFromDevice = async () => {

    try {
      const data = await BLEService.receiveDataFromDevice(serviceUUID, characteristicUUID);
      Alert.alert('Datos recibidos', `Valor: ${data}`);
    } catch (error: any) {
      console.log(error)
      Alert.alert('Error al recibir datos', error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Pedir Permisos Bluetooth" onPress={requestPermissions} />
      <View style={{ marginTop: 10 }}>
        <Button title="Escanear Dispositivos" onPress={scanForDevice} />
      </View>
      {deviceInfo && <Text style={{ marginTop: 10 }}>Info del dispositivo: {deviceInfo}</Text>}
      <View style={{ marginTop: 10 }}>
        <Button title="Conectar al Dispositivo" onPress={connectToDevice} disabled={!deviceInfo} />
      </View>
      {connected && <Text style={{ marginTop: 10 }}>Dispositivo conectado</Text>}
      <View style={{ marginTop: 10 }}>
        <Button title="Enviar Comando" onPress={sendCommandToDevice} disabled={!connected} />
      </View>
      {response && <Text style={{ marginTop: 10 }}>Respuesta del dispositivo: {response}</Text>}
      <View style={{ marginTop: 10 }}>
        <Button title="Recibir Respuesta" onPress={receiveResponseFromDevice} disabled={!connected} />
      </View>
      {receivedData && <Text style={{ marginTop: 10 }}>Datos recibidos: {receivedData}</Text>}
    </View>
  );
};

export default Test;
