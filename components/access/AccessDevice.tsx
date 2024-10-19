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
import React from "react";
import { Pressable as RPressable, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { useToastUtil } from "../ToastUtil";
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

interface SingleDeviceProps {
  mac?: string;
}

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
    subText: "Features",
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

  return (
    <DashboardLayout title="Acceso">

      <View className="flex-1">
        {/* Box superior de 300px */}

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


        {/* BOOOOOOTOOON */}

        <View className="flex-1 justify-center items-center">
  <View style={{ position: 'relative', width: '60%', height: '60%', justifyContent: 'center', alignItems: 'center' }}>
    {[...Array(3).keys()].map((index) => (
      <MotiView
        key={index}
        from={{ opacity: 0.7, scale: 1 }}
        animate={{ opacity: 0, scale: 4 }}
        transition={{
          type: 'timing',
          duration: 2000,
          easing: Easing.out(Easing.ease),
          delay: index * 400,
          loop: true,
        }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: 'rgba(0, 0, 255, 0.5)',
          position: 'absolute',
          top: '50%', // Centramos verticalmente
          left: '50%', // Centramos horizontalmente
          marginTop: -40, // La mitad de la altura
          marginLeft: -40, // La mitad de la anchura
        }}
      />
    ))}

    <TouchableRipple
      onPress={() => console.log('Button Pressed')} // Maneja el evento de presionar
      style={{
        backgroundColor: '#1E90FF',
        borderRadius: 9999,
        width: '100%',
        height: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',

        // Sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,

        // Elevación para Android
        elevation: 5,
      }}
      rippleColor="rgba(255, 255, 255, 0.3)" // Color de la onda
    >
      <Icon className="h-[45%] w-[45%]" style={{ color: '#FFFFFF' }} as={Power} />
    </TouchableRipple>
  </View>
</View>
      </View>
    </DashboardLayout>
  );
};
