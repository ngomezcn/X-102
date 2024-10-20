import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import {
  ChevronRightIcon,
  Icon
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
import { AccessButton } from "./AccessButton";
import { Device } from "react-native-ble-plx";

interface SingleDeviceProps {
  deviceId: string;
}

interface AccountCardType {
  iconName: LucideIcon | typeof Icon;
  subText: string;
  endIcon: LucideIcon | typeof Icon;
}

const menuData: AccountCardType[] = [
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

export const AccessDevice: React.FC<SingleDeviceProps> = ({ deviceId }) => {

  const reduxDevices = useSelector((state: RootState) => state.device.devices);
  const reduxDevicesList = Object.values(reduxDevices);
  const reduxSingleDevice = reduxDevicesList[0];
  const dispatch = useDispatch();
  const selectedMac = deviceId || reduxSingleDevice?.mac;
  const { showToast } = useToastUtil();

  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle'); // Estado del botón

  const handleButtonClick = () => {
    setButtonState('loading'); // Establece el estado inicial

    // Usa setTimeout para cambiar el estado a 'success' después de 5 segundos
    setTimeout(() => {
      setButtonState('success');
    }, 7000);
  };

  return (
    <DashboardLayout title="Acceso">

      <View className="flex-1">

        <View className="">
          <VStack space="lg" className="items-center md:mt-14 mt-6 w-full md:px-10 md:pt-6 pb-4">
            <Text size="3xl" className="font-roboto text-dark font-bold">
              {reduxSingleDevice.deviceName}
            </Text>
            <Text className="font-roboto text-sm text-typograpphy-800">
              {reduxSingleDevice.deviceAddress}
            </Text>
            <Text className="font-roboto text-sm text-typograpphy-800">
              {reduxSingleDevice.deviceNameInternal}
            </Text>
          </VStack>

          {/* Este VStack es el que tenías en la parte inferior */}
          <VStack space="lg" >
            <Divider />
            {menuData.map((item, index) => (
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
