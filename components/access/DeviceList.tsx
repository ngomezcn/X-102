import React from "react";
import { Button, ButtonText } from '@/components/ui/button';
import { Box } from "@/components/ui/box";
import { FlatList } from 'react-native';
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { Card } from '@/components/ui/card';
import { IotDevice as IoTDevice } from "@/models/IoTDevice";
import { useDispatch } from '@/store/store'; // Usa tu hook personalizado
import { setFocusedDeviceAsync } from '@/store/slices/focusedDeviceSlice';
import NavigationService from "@/services/NavigationService";
import { AppRoutes } from "@/constants/AppRoutes";

interface Props {
  devices: IoTDevice[];
}

export const DeviceList: React.FC<Props> = ({ devices }) => {

  const dispatch = useDispatch();

  const handlePress = async (device: IoTDevice) => {
    await dispatch(setFocusedDeviceAsync(device)).unwrap();
    NavigationService.navigate(AppRoutes.AccessRoutes.AccessDevice);
  }

  return (
    <>
      <ScrollView>
        <VStack className="px-4 py-4 flex-1">
          <FlatList
            data={devices}
            keyExtractor={(device) => device.id}
            renderItem={({ item }: { item: IoTDevice }) => (
              <Card className="rounded-lg border border-gray-300 mb-4">
                <Text className="text-sm font-normal mb-2 text-typography-700">
                  {item.internalDeviceName}
                </Text>
                <VStack className="mb-6">
                  <Heading size="md" className="mb-2">
                    {item.name}
                  </Heading>
                  <Text size="sm">
                    {item.location}
                  </Text>
                </VStack>
                <Box className="flex-col sm:flex-row">
                  <Button
                    onPress={() => handlePress(item)}
                    className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
                    <ButtonText size="sm">Acceder</ButtonText>
                  </Button>
                </Box>
              </Card>
            )}
          />
          <Divider />
        </VStack>
      </ScrollView>
    </>
  );
};
