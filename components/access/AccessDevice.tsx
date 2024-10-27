import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import {
  ChevronRightIcon,
  Icon,
  UIIcon
} from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { RootState } from "@/store/store";
import { Boxes, PenBox, Power, ScrollText, type LucideIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable as RPressable, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { useToastUtil } from "../ToastUtil";
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { AccessButton, ButtonStates } from "./AccessButton";
import { Device } from "react-native-ble-plx";
import { useBLEService } from '@/hooks/useBLEService'; // Asegúrate de ajustar la ruta
import { Base64 } from 'js-base64';
import log from "@/utils/logger";
import { IotDevice } from "@/models/IoTDevice";
import { BLESpecifications } from "@/models/Specifications";

interface SingleDeviceProps {
  iotDevice: IotDevice;
}

interface ListEntriesType {
  iconName: LucideIcon | typeof UIIcon;
  subText: string;
  endIcon: LucideIcon | typeof UIIcon;
}

const listEntries: ListEntriesType[] = [
  {
    iconName: PenBox,
    subText: "Modificar",
    endIcon: ChevronRightIcon,
  },
  {
    iconName: Boxes,
    subText: "Funcionalidades",
    endIcon: ChevronRightIcon,
  },
  {
    iconName: ScrollText,
    subText: "Registro",
    endIcon: ChevronRightIcon,
  }
];

const DashboardLayout = (props: any) => {

  return (
    <>
      <VStack className="flex-1 px-5 py-4">
        <VStack className="flex-1 w-full">
          <HStack className="flex-1 w-full">
            <VStack className="flex-1 w-full">
              {props.children}
            </VStack>
          </HStack>
        </VStack>
      </VStack >
    </>
  );
};

export const AccessDevice: React.FC<SingleDeviceProps> = ({ iotDevice }) => {

  const { showToast } = useToastUtil();

  const [buttonState, setButtonState] = useState<string>(ButtonStates.idle); // Estado del botón

  const BLEService = useBLEService(); // Usamos el servicio BLE

  const serviceUUID = '4c491e6a-38df-4d0f-b04b-8704a40071ce'; // Reemplaza con tu UUID de servicio
  const characteristicUUID = 'b0726341-e52e-471b-9cd6-4061e54616cc'; // Reemplaza con tu UUID de característica


  const handleButtonClick = async () => {
    if (buttonState === ButtonStates.loading) return;

    setButtonState(ButtonStates.loading);

    try {

      log.debug(iotDevice)

      if (iotDevice.specifications?.type === 'BLE') {

        const granted = await BLEService.requestBluetoothPermissions();

        if (granted) {

          const bleSpecs = iotDevice.specifications as BLESpecifications;
          const macAddress = bleSpecs.mac!;

          BLEService.setMac(macAddress);

          await BLEService.scanForDevice();
          await BLEService.connectToDevice();

          const command = Base64.encode('AK=' + bleSpecs.accessKey);
          await BLEService.sendCommand(serviceUUID, characteristicUUID, command);

          const data = await BLEService.receiveDataFromDevice(serviceUUID, characteristicUUID);

          await BLEService.disconnect();

          if (data.includes("OK")) {
            setButtonState(ButtonStates.success);
          } else {
            setButtonState(ButtonStates.error);
          }

        } else {
          setButtonState(ButtonStates.idle);
        }

      } else {
        console.warn('El dispositivo no es de tipo BLE, no se puede obtener la dirección MAC.');
      }


    } catch (error: any) {
      log.error("error " + error);
      setButtonState('error');
    }
  };

  return (
    <DashboardLayout title="Acceso">

      <View className="flex-1">

        <View className="">
          <VStack space="lg" className="items-center md:mt-14 mt-6 w-full md:px-10 md:pt-6 pb-4">
            <Text size="3xl" className="font-roboto text-dark font-bold">
              {iotDevice.name}
            </Text>
            <Text className="font-roboto text-sm text-typograpphy-800">
              {iotDevice.location}
            </Text>
            <Text className="font-roboto text-sm text-typograpphy-800">
              {iotDevice.internalDeviceName}
            </Text>
          </VStack>

          {/* Este VStack es el que tenías en la parte inferior */}
          <VStack space="lg" >
            <Divider />
            {listEntries.map((item, index) => (
              <TouchableRipple key={index} rippleColor="rgba(0, 0, 0, .32)">
                <HStack className="justify-between">
                  <HStack space="md">
                    <Icon as={item.iconName} />
                    <Text>{item.subText}</Text>
                  </HStack>
                  <RPressable>
                    {({ pressed }) => (
                      <Icon
                        as={item.endIcon}
                        className={`${pressed ? "text-background-500" : "text-background-800"} md:hidden`}
                      />
                    )}
                  </RPressable>
                </HStack>
              </TouchableRipple>
            ))}
            <Divider />
          </VStack>
        </View>

        <AccessButton
          onClickButton={handleButtonClick}
          buttonState={buttonState}
        />

      </View>
    </DashboardLayout>
  );
};
