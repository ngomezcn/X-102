import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';

import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { AppRoutes } from '@/constants/AppRoutes';
import NavigationService from '@/services/NavigationService';
import { RootState } from '@/store/store';
import { PlusCircleIcon, TriangleAlert } from "lucide-react-native";
import React from "react";
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

export const NoDevicesMessage: React.FC<{ settActiveTab?: (tab: string) => void; }> = ({ settActiveTab }) => {
  const devices = useSelector((state: RootState) => state.device.devices);

  const deviceList = Object.values(devices);

  return (
    <Box>
      <VStack space="lg">
        <HStack className="justify-between">
          <HStack space="md">
            <Icon as={TriangleAlert} />
            <Text size="sm" >Todavía no tienes ningún acceso disponible</Text>
          </HStack>
        </HStack>
      </VStack>

      <Divider className="my-2" />

      <Button
        action="secondary"
        variant="outline"
        onPress={() => {

          NavigationService.navigate(AppRoutes.Add);

        }} >
        <ButtonIcon as={PlusCircleIcon} />
        <ButtonText>Configurar dispositivo</ButtonText>
      </Button>

      {/* Aquí agregamos la lista de dispositivos */}
      {deviceList.length > 0 ? (
        <FlatList
          data={deviceList}
          keyExtractor={(item) => item.mac} // Usar MAC como clave
          renderItem={({ item }) => (
            <Box>
              <Text>{item.deviceName || item.deviceNameInternal || 'Nombre de dispositivo no disponible'}</Text>
              <Text>MAC: {item.mac}</Text>
              <Text>Dirección: {item.deviceAddress}</Text>
            </Box>
          )}
        />
      ) : (
        <Text>No hay dispositivos configurados.</Text> // Mensaje si no hay dispositivos
      )}
    </Box>
  );
};


