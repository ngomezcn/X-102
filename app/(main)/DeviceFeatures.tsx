import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useEffect, useLayoutEffect } from "react";
import { ScrollView } from "react-native";
import { ModalConnStringManager } from "../../components/add/ModalConnStringManager";
import { ModalQrManager } from "../../components/add/ModalQrManager";
import { useHeading } from "@/hooks/useHeading";
import { useFocusEffect } from "expo-router";
import { AppRoutes } from "@/constants/AppRoutes";
import { HStack } from "@/components/ui/hstack";
import { ButtonGroup } from "@/components/ui/button";
import { Pressable } from "@/components/ui/pressable";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonIcon } from "@/components/ui/button";
import { ButtonText } from "@/components/ui/button";
import { BadgeText } from "@/components/ui/badge";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Pressable as RPressable } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal"
import { Textarea, TextareaInput } from "@/components/ui/textarea"
import NavigationService from "@/services/NavigationService";
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { AudioLines, ChevronRight, Cpu, Delete, HousePlus, Pencil, ScanLine, Share2, Trash, Trash2 } from "lucide-react-native";

const DeviceFeatures = () => {

  const { setHeaderSettings } = useHeading();

  useFocusEffect(
    React.useCallback(() => {

      setHeaderSettings({
        heading: "Funcionalidades",
        isIconVisible: false,
        isHeaderVisible: true,
        isLeftArrowVisible: true,
        goBackRoute: AppRoutes.AccessRoutes.AccessDevice,
      });

      /*return () => {
        // Puedes restablecer el encabezado o limpiar si es necesario cuando se pierde el foco
        setIconVisibility(false);
        setHeaderVisibility(false);
      };*/
    }, [])
  );

  return <>
    <ScrollView >
      <VStack className="px-5 py-4 flex-1" space="lg">

        <VStack space="lg">
          <TouchableRipple
            //onPress={() => NavigationService.navigate(AppRoutes.ScanQR)}
            //onPress={handlePress}
            rippleColor="rgba(0, 0, 0, .32)">
            <HStack className="justify-between">
              <HStack space="md">
                <Icon as={HousePlus} />
                <Text>Crear acceso directo</Text>
              </HStack>
              <RPressable onPress={() => NavigationService.navigate(AppRoutes.ScanQR)}>

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
            //onPress={() => NavigationService.navigate(AppRoutes.ScanQR)}
            //onPress={handlePress}
            rippleColor="rgba(0, 0, 0, .32)">
            <HStack className="justify-between">
              <HStack space="md">
                <Icon as={AudioLines} />
                <Text>Configurar manos libres</Text>
              </HStack>
              <RPressable onPress={() => NavigationService.navigate(AppRoutes.ScanQR)}>

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
            //onPress={() => NavigationService.navigate(AppRoutes.ScanQR)}
            //onPress={handlePress}
            rippleColor="rgba(0, 0, 0, .32)">
            <HStack className="justify-between">
              <HStack space="md">
                <Icon as={Share2} />
                <Text>Invitación temporal</Text>
              </HStack>
              <RPressable onPress={() => NavigationService.navigate(AppRoutes.ScanQR)}>

                {({ pressed }) => (
                  <Icon
                    as={ChevronRight}
                    className={`${pressed ? "text-background-500" : "text-background-800"} md:hidden `}
                  />
                )}
              </RPressable>
            </HStack>
          </TouchableRipple>
         
        </VStack>

        <Divider />

        <Box className="bg-background-50 p-4 rounded-md">
          <Text className="text-center font-medium">
            Para acceder, necesitas un código QR o un código de acceso. Agrégalo y tu acceso estará configurado de forma segura.
          </Text>
        </Box>

      </VStack>
    </ScrollView>
  </>;
};

export default DeviceFeatures;
