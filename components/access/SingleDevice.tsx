import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { removeDevice } from '@/features/device/deviceSlice';
import { HStack } from "../ui/hstack";
import { Device, NativeDevice } from 'react-native-ble-plx';
import { useBLEService } from '@/components/BLEService'; // Importa tu servicio de Bluetooth
import log from '../logger';

export const SingleDevice = () => {
  const { error, setMac, connect } = useBLEService();

  const reduxDevices = useSelector((state: RootState) => state.device.devices);
  const reduxDevicesList = Object.values(reduxDevices);
  const reduxSingleDevice = reduxDevicesList[0];

  const dispatch = useDispatch();

  const handleRemoveDevice = (mac: string) => {
    dispatch(removeDevice(mac));
  };

  const handleOpenDevice = async () => {
    log.debug("sdfsdfsdf")

    setMac(reduxSingleDevice.mac);

    try {
      await connect(); 
      console.log('Connected successfully');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckDevice = (mac: string) => {

  };

  return (
    <>
      {reduxSingleDevice ? (
        <Box>
          <Text>{reduxSingleDevice.deviceName || reduxSingleDevice.deviceNameInternal || 'Nombre de dispositivo no disponible'}</Text>
          <Text>MAC: {reduxSingleDevice.mac}</Text>
          <Text>Dirección: {reduxSingleDevice.deviceAddress}</Text>

          {/* Sección de botones con separación usando Tailwind */}
          <HStack className="mt-4">
            <Button onPress={() => handleRemoveDevice(reduxSingleDevice.mac)}>
              <ButtonText>Eliminar</ButtonText>
            </Button>
          </HStack>

          <HStack className="mt-4">
            <Button onPress={() => handleOpenDevice()}>
              <ButtonText>Abrir</ButtonText>
            </Button>
          </HStack>

          <HStack className="mt-4">
            <Button onPress={() => handleCheckDevice(reduxSingleDevice.mac)}>
              <ButtonText>Comprobar</ButtonText>
            </Button>
          </HStack>
        </Box>
      ) : (
        <Text>No hay dispositivos disponibles</Text>
      )}
    </>
  );
};
