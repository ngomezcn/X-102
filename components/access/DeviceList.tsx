import React from "react";
import { Button, ButtonText, ButtonSpinner, ButtonIcon } from '@/components/ui/button';
import { Box } from "@/components/ui/box";
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeDevice } from '@/store/slices/deviceSlice'; // Asegúrate de importar la acción correcta
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import { ChevronLeftIcon, Icon, MenuIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { MoveRight, MoveRightIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Heading } from "@/components/ui/heading";
import { ScrollView } from "@/components/ui/scroll-view";
import { Divider } from "@/components/ui/divider";
import { Image } from '@/components/ui/image';
import { Card } from '@/components/ui/card';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Grid, GridItem } from "@/components/ui/grid"
import { IotDevice as IoTDevice } from "@/models/IoTDevice";

interface Props {
  devices: IoTDevice[];
  onDeviceSelect: (device: IoTDevice) => void;
}

export const DeviceList: React.FC<Props> = ({ devices, onDeviceSelect }) => {
  //const devices = useSelector((state: RootState) => state.device.devices);
  const deviceList = Object.values(devices);

  return (
    <>
      <Card className="p-5 rounded-lg max-w-[360px] m-3 border border-gray-300"> {/* Añade la clase de borde */}
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1595231712325-9fedecef7575?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
          }}
          className="mb-6 h-[240px] w-full rounded-md"
        />
        <Text className="text-sm font-normal mb-2 text-typography-700">
          Fashion Clothing
        </Text>
        <VStack className="mb-6">
          <Heading size="md" className="mb-4">
            Cotton Kurta
          </Heading>
          <Text size="sm">
            Floral embroidered notch neck thread work cotton kurta in white and
            black.
          </Text>
        </VStack>
        <Box className="flex-col sm:flex-row">
          <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
            <ButtonText size="sm">Add to cart</ButtonText>
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2 border-outline-300 sm:flex-1"
          >
            <ButtonText size="sm" className="text-typography-600">
              Wishlist
            </ButtonText>
          </Button>
        </Box>
      </Card>

      <Grid className="gap-5">
        {deviceList.map((item, index) => {
          return (
            <GridItem
              _extra={{
                className: "col-span-12 sm:col-span-6 lg:col-span-4",
              }}
              key={index}
            >
              <HStack
                space="md"
                className="border border-border-300 rounded-lg p-4 items-center justify-between"
              >
                <HStack space="xl" className="items-center">
                  <VStack>
                    <Text className="font-semibold text-typography-900 line-clamp-1">
                      {item.name}
                    </Text>
                    <Text className="line-clamp-1">{item.location}</Text>
                  </VStack>
                </HStack>
                <Button size="xs" onPress={() => onDeviceSelect(item)}>
                  <ButtonText>Acceder</ButtonText>
                  <ButtonIcon as={MoveRightIcon} />
                </Button>
              </HStack>
            </GridItem>
          );
        })}
      </Grid>

    </>



  );
};