import React from "react";
import { Button, ButtonText, ButtonSpinner, ButtonIcon } from '@/components/ui/button';
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { removeDevice } from '@/features/device/deviceSlice'; // Asegúrate de importar la acción correcta

export const DeviceList = () => {
  const devices = useSelector((state: RootState) => state.device.devices);
  const deviceList = Object.values(devices);
  const dispatch = useDispatch(); 

  const handleRemoveDevice = (mac: string) => {
    dispatch(removeDevice(mac)); 
  };

  return (
    <>
      <FlatList
        data={deviceList}
        keyExtractor={(item) => item.mac} 
        renderItem={({ item }) => (
          <Box>
            <Text>{item.deviceName || item.deviceNameInternal || 'Nombre de dispositivo no disponible'}</Text>
            <Text>MAC: {item.mac}</Text>
            <Text>Dirección: {item.deviceAddress}</Text>
            <Button onPress={() => handleRemoveDevice(item.mac)}> 
              <ButtonText>Eliminar</ButtonText>
            </Button>
          </Box>
        )}
      />
    </>
  );
};
