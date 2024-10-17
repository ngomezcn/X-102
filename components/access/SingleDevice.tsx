import React from "react";
import { Button, ButtonText } from '@/components/ui/button';
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { removeDevice } from '@/features/device/deviceSlice';

export const SingleDevice = () => {
  const devices = useSelector((state: RootState) => state.device.devices);
  const deviceList = Object.values(devices);
  const dispatch = useDispatch(); 

  const handleRemoveDevice = (mac: string) => {
    dispatch(removeDevice(mac)); 
  };

  // Solo obtenemos el primer dispositivo si existe
  const firstDevice = deviceList[0];

  return (
    <>
      {firstDevice ? ( // Verificamos si existe un primer dispositivo
        <Box>
          <Text>{firstDevice.deviceName || firstDevice.deviceNameInternal || 'Nombre de dispositivo no disponible'}</Text>
          <Text>MAC: {firstDevice.mac}</Text>
          <Text>Dirección: {firstDevice.deviceAddress}</Text>
          <Button onPress={() => handleRemoveDevice(firstDevice.mac)}> 
            <ButtonText>Eliminar</ButtonText>
          </Button>
        </Box>
      ) : (
        <Text>No hay dispositivos disponibles</Text> // Mensaje si no hay dispositivos
      )}
    </>
  );
};
