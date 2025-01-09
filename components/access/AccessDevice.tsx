
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
import { Boxes, PenBox, Power, ScrollText, Settings2, type LucideIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable as RPressable, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { useToastUtil } from "../ToastUtil";
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { AccessButton, ButtonStates } from "./AccessButton";
import { Device } from "react-native-ble-plx";
import { Base64 } from 'js-base64';
import log from "@/utils/logger";
import { IotDevice } from "@/models/IoTDevice";
import { BLESpecifications } from "@/models/Specifications";
import { RootState as ReduxRootState } from '@/store/store';
import { useFocusEffect } from "expo-router";
import { useHeading } from "@/hooks/useHeading";
import { AppRoutes } from "@/constants/AppRoutes";
import { BleHandler } from "@/services/BLEServiceInstance";
import NavigationService from "@/services/NavigationService";

interface ListEntriesType {
  iconName: LucideIcon | typeof UIIcon;
  subText: string;
  endIcon: LucideIcon | typeof UIIcon;
}

const listEntries: ListEntriesType[] = [
  {
    iconName: Settings2,
    subText: "Opciones",
    endIcon: ChevronRightIcon,
  },
  {
    iconName: Boxes,
    subText: "Funcionalidades",
    endIcon: ChevronRightIcon,
  }
  /*,{
    iconName: ScrollText,
    subText: "Registro",
    endIcon: ChevronRightIcon,
  }*/
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


export const AccessDevice = () => {
  const [isReady, setIsReady] = useState(false);
  const iotDevice = (useSelector((state: ReduxRootState) => state.focusedDevice.device))! as IotDevice;
  const devices = useSelector((state: ReduxRootState) => state.device.devices);
  const { setHeaderSettings } = useHeading();
  const { showToast } = useToastUtil();
  const [buttonState, setButtonState] = useState<string>(ButtonStates.idle); // Estado del botón
  const serviceUUID = '4c491e6a-38df-4d0f-b04b-8704a40071ce'; // Reemplaza con tu UUID de servicio
  const characteristicUUID = 'b0726341-e52e-471b-9cd6-4061e54616cc'; // Reemplaza con tu UUID de característica
  let bleHandler : BleHandler;

  useEffect(() => {
    if (iotDevice) {

      setIsReady(true);
    }
  }, [iotDevice]);

  useFocusEffect(
    React.useCallback(() => {

      setHeaderSettings({
        heading: "Acceso",
        isIconVisible: true,
        isHeaderVisible: true,
        isLeftArrowVisible: true,
        goBackRoute: AppRoutes.Access,
      });
    }, [])
  );

  const handleButtonClick = async () => {
    if (buttonState === ButtonStates.loading) return;

    try {

      log.debug(iotDevice)

      if (iotDevice.specifications?.type === 'BLE') {

        setButtonState(ButtonStates.loading);

        bleHandler = new BleHandler()

        const granted = await bleHandler.requestBluetoothPermissions();
        bleHandler.resetManager();

        if (granted) {

          const bleSpecs = iotDevice.specifications as BLESpecifications;
          const macAddress = bleSpecs.mac!;

          bleHandler.setMac(macAddress);

          await bleHandler.scanForDevice();
          await bleHandler.connectToDevice();

          const command = Base64.encode('AK=' + bleSpecs.accessKey);
          await bleHandler.sendCommand(serviceUUID, characteristicUUID, command);

          const response = await bleHandler.receiveDataFromDevice(serviceUUID, characteristicUUID);

          if (response.includes("OK")) {
            setButtonState(ButtonStates.success);
          } else {
            setButtonState(ButtonStates.error);
          }

        } else {
          //....
        }

      } else {
        console.warn('El dispositivo no es de tipo BLE, no se puede obtener la dirección MAC.');
      }

    } catch (error) {
      log.error(error);
      setButtonState(ButtonStates.error);
    } finally {
      await bleHandler.disconnect();
      await bleHandler.destroy(); 
      //setButtonState(ButtonStates.idle); 
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

          <VStack space="lg" >
            <Divider />
            <TouchableRipple rippleColor="rgba(0, 0, 0, .32)"
              onPress={() => NavigationService.navigate(AppRoutes.DeviceOptions)}
            >
                <HStack className="justify-between">
                  <HStack space="md">
                    <Icon as={Settings2} />
                    <Text>{"Opciones del dispositivo"}</Text>
                  </HStack>
                  <RPressable onPress={() =>  NavigationService.navigate(AppRoutes.DeviceOptions)}>
                    {({ pressed }) => (
                      <Icon
                        as={ChevronRightIcon}
                        className={`${pressed ? "text-background-500" : "text-background-800"} md:hidden`}
                      />
                    )}
                  </RPressable>
                </HStack>
              </TouchableRipple>
              <TouchableRipple rippleColor="rgba(0, 0, 0, .32)"
              onPress={() => NavigationService.navigate(AppRoutes.DeviceFeatures)}
              >
                <HStack className="justify-between">
                  <HStack space="md">
                    <Icon as={Boxes} />
                    <Text>{"Funcionalidades"}</Text>
                  </HStack>
                  <RPressable onPress={() =>  NavigationService.navigate(AppRoutes.DeviceFeatures)}>
                    {({ pressed }) => (
                      <Icon
                        as={ChevronRightIcon}
                        className={`${pressed ? "text-background-500" : "text-background-800"} md:hidden`}
                      />
                    )}
                  </RPressable>
                </HStack>
              </TouchableRipple>
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
