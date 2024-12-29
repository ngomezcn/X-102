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

const AddScreen = () => {

  const { setHeadingAppName, setIconVisibility, setHeaderVisibility, setLeftArrowVisibility } = useHeading();

  useFocusEffect(
    React.useCallback(() => {
      setHeadingAppName('Añadir');
      setIconVisibility(true);
      setHeaderVisibility(true);
      
      return () => {
        // Puedes restablecer el encabezado o limpiar si es necesario cuando se pierde el foco
        setIconVisibility(false);
        setHeaderVisibility(false);
      };
    }, [])
  );

  return <>
    <ScrollView >
      <VStack className="px-5 py-4 flex-1" space="lg">

        <VStack space="lg">
          <ModalQrManager />
          <ModalConnStringManager />
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

export default AddScreen;
