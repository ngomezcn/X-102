import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { ScrollView } from "react-native";
import { ConnStringManager } from "../../components/add/connString/ConnStringManager";
import { ScanQrItem } from "../../components/add/qr/ScanQrItem";
import { useHeading } from "@/hooks/useHeading";

const AddScreen = () => {

  const {setHeadingAppName,setIconVisibility, setHeaderVisibility, setLeftArrowVisibility } = useHeading();
  setHeadingAppName("Añadir")

  return <>
    <ScrollView >
      <VStack className="px-5 py-4 flex-1" space="lg">

        {/*<Heading className="md">Añadir Gate</Heading>

        <Divider /> */}

        <VStack space="lg">
          <ScanQrItem />
          <ConnStringManager />
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
