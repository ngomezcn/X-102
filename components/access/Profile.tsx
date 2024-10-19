import React, { useRef, useState } from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { View } from 'react-native';
import {
  AlertCircleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  EditIcon,
  Icon,
  MenuIcon,
  PhoneIcon,
  SettingsIcon,
} from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { AlertCircle, BookKey, Boxes, BoxIcon, HelpCircle, Pen, PenBox, Power, ScrollText, type LucideIcon } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import Image from "@unitools/image";
import { ScrollView } from "@/components/ui/scroll-view";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal";
import { Input, InputField } from "@/components/ui/input";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { ProfileIcon } from "./assets/icons/profile";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { Center } from "@/components/ui/center";
import { cn } from "@gluestack-ui/nativewind-utils/cn";
import { Keyboard, Platform } from "react-native";
import { SubscriptionIcon } from "./assets/icons/subscription";
import { DownloadIcon } from "./assets/icons/download";
import { FaqIcon } from "./assets/icons/faq";
import { NewsBlogIcon } from "./assets/icons/news-blog";
import { HomeIcon } from "./assets/icons/home";
import { GlobeIcon } from "./assets/icons/globe";
import { InboxIcon } from "./assets/icons/inbox";
import { HeartIcon } from "./assets/icons/heart";
import { Divider } from "@/components/ui/divider";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { CameraSparklesIcon } from "./assets/icons/camera-sparkles";
import { EditPhotoIcon } from "./assets/icons/edit-photo";
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import { TouchableRipple } from 'react-native-paper';
import { Pressable as RPressable } from 'react-native';
import { ScanQrItem } from "../add/qr/ScanQrItem";
import { ConnStringManager } from "../add/connString/ConnStringManager";
import { Badge, BadgeText } from "../ui/badge";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useToastUtil } from "../ToastUtil";
import AppHeader from "../header/Header";

interface SingleDeviceProps {
  mac?: string;
}

interface SingleDeviceProps {
  deviceId: string;
}


type MobileHeaderProps = {
  title: string;
};

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

export const Profile: React.FC<SingleDeviceProps> = ({ deviceId }) => {

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

        <View
          className="flex-1 justify-center items-center">
          <TouchableRipple
            underlayColor={"#ffffff"}
            rippleColor={"#ffffff"}

            onPress={() => console.log("")}
            borderless={true}
            className="bg-gray-300 rounded-full"
            style={{
              backgroundColor: '#1E90FF',
              borderRadius: 9999,
              width: '60%',
              height: '60%',
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
            }}>
            <Icon className="h-[45%] w-[45%]" style={{ color: '#FFFFFF' }} as={Power} />
          </TouchableRipple>
        </View>
      </View>
    </DashboardLayout>
  );
};
