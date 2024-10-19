import { Grid, GridItem } from '@/components/ui/grid';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Box } from "@/components/ui/box";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeDevice } from '@/store/slices/deviceSlice';
import { Device, NativeDevice } from 'react-native-ble-plx';
//import { useBLEService } from '@/hooks/useBLEService'; // Importa tu servicio de Bluetooth
import log from '../../utils/logger';
import { ButtonGroup } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Badge } from "@/components/ui/badge";
import { BadgeText } from "@/components/ui/badge";
import { ScrollView } from "react-native";
import { Blinds, BookKey, Camera, ChevronDown, ChevronDownCircleIcon, ChevronRight, EditIcon, FileKey, FileWarning, GlobeIcon, Key, LucideQrCode, Package, Pen, Plus, PlusCircleIcon, Power, QrCode, QrCodeIcon, Scan, ScanLine, ScanQrCode, Settings, Tablets, TriangleAlert } from "lucide-react-native";
import { AppRoutes } from '@/constants/AppRoutes'
import { Icon } from "@/components/ui/icon";
import { Pressable as RPressable } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { ScanQrItem } from "../../components/add/qr/ScanQrItem";
import { HStack } from '../ui/hstack';
import NavigationService from '@/services/NavigationService';
import { Divider } from "@/components/ui/divider";
import { Image } from '../ui/image';
import { Card } from '../ui/card';

interface SingleDeviceProps {
  mac?: string;
}

interface SingleDeviceProps {
  deviceId: string;
}

export const SingleDevice: React.FC<SingleDeviceProps> = ({ deviceId }) => {
  //const bleService = useBLEService();
  const reduxDevices = useSelector((state: RootState) => state.device.devices);
  const reduxDevicesList = Object.values(reduxDevices);
  const reduxSingleDevice = reduxDevicesList[0];
  const dispatch = useDispatch();

  // Usa la MAC proporcionada o la del dispositivo de redux
  const selectedMac = deviceId || reduxSingleDevice?.mac;

  const handleRemoveDevice = (mac: string) => {
    dispatch(removeDevice(mac));
  };

  const handleOpenDevice = async () => {
    /*if (selectedMac) {
      log.debug("Intentando conectar al dispositivo");
      bleService.setMac(selectedMac);
      try {
        await bleService.connect();
        console.log('Connected successfully');
      } catch (err) {
        console.error('Error al conectar:', err);
      }
    }*/
  };

  const handleDisconnectDevice = async () => {
    /*log.debug("Intentando desconectar el dispositivo");
    try {
      await bleService.disconnect(); // Función que debes implementar en tu servicio BLE
      console.log('Disconnected successfully');
    } catch (err) {
      console.error('Error al desconectar:', err);
    }*/
  };

  const handleCheckDevice = (mac: string) => {
    /*log.debug("Enviando datos al dispositivo");
    const valueToWrite = Buffer.from('Hello BLE').toString('base64');
    bleService.writeCharacteristic(
      "4c491e6a-38df-4d0f-b04b-8704a40071ce",
      "b0726341-e52e-471b-9cd6-4061e54616cc",
      "equisde"
    );*/
  };

  return (
    <>


      



      {/* <VStack space="lg">
        <TouchableRipple
          onPress={() => NavigationService.navigate(AppRoutes.ToDo)}
          rippleColor="rgba(0, 0, 0, .32)">
          <HStack className="justify-between">
            <HStack space="md">
              <Icon as={Pen} />
              <Text>Modificar</Text>
            </HStack>
            <RPressable onPress={() => NavigationService.navigate(AppRoutes.ToDo)}>

              {({ pressed }) => (
                <Icon
                  as={ChevronRight}
                  className={`${pressed ? "text-background-500" : "text-background-800"} md:hidden `}
                />
              )}
            </RPressable>
          </HStack>
        </TouchableRipple>

        <TouchableRipple
          onPress={() => NavigationService.navigate(AppRoutes.ToDo)}
          rippleColor="rgba(0, 0, 0, .32)">
          <HStack className="justify-between">
            <HStack space="md">
              <Icon as={Package} />
              <Text>Funcionalidades</Text>
            </HStack>
            <RPressable onPress={() => NavigationService.navigate(AppRoutes.ToDo)}>

              {({ pressed }) => (
                <Icon
                  as={ChevronRight}
                  className={`${pressed ? "text-background-500" : "text-background-800"} md:hidden `}
                />
              )}
            </RPressable>
          </HStack>
        </TouchableRipple>

        <Divider />

        <VStack className="mb-6 h-[240px] w-full flex justify-center items-center">
          <Icon as={Power} className="h-[250px] w-[250px]" /> {/* Cambia IconName por el ícono deseado 
    </VStack >

      <Divider />


  {
    reduxSingleDevice ? (

      <Box>
        <Text>
          {reduxSingleDevice.deviceName ||
            reduxSingleDevice.deviceNameInternal ||
            'Nombre de dispositivo no disponible'}
        </Text>
        <Text>MAC: {selectedMac}</Text>
        <Text>Dirección: {reduxSingleDevice.deviceAddress}</Text>

        Sección de botones con separación usando Tailwind
        <HStack className="mt-4">
          <Button onPress={() => handleRemoveDevice(selectedMac!)}>
            <ButtonText>Eliminar</ButtonText>
          </Button>
        </HStack>

        <HStack className="mt-4">
          <Button onPress={() => handleOpenDevice()}>
            <ButtonText>Conectar</ButtonText>
          </Button>
        </HStack>

        <HStack className="mt-4">
          <Button onPress={() => handleDisconnectDevice()}>
            <ButtonText>Desconectar</ButtonText>
          </Button>
        </HStack>

        <HStack className="mt-4">
          <Button onPress={() => handleCheckDevice(selectedMac!)}>
            <ButtonText>Enviar</ButtonText>
          </Button>
        </HStack>
      </Box>
    ) : (
      <Text>No hay dispositivos disponibles</Text>
    )
  } 
}
      </VStack >*/}

    </>
  );
};
