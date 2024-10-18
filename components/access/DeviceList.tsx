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
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";

import { Grid, GridItem } from "@/components/ui/grid"

export const DeviceList = () => {
  const devices = useSelector((state: RootState) => state.device.devices);
  const deviceList = Object.values(devices);

  return (

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
                    {item.deviceName}
                  </Text>
                  <Text className="line-clamp-1">{item.deviceAddress}</Text>
                </VStack>
              </HStack>
              <Button size="xs">
                <ButtonText>Acceder</ButtonText>
                <ButtonIcon as={MoveRightIcon}/>
              </Button>
            </HStack>
          </GridItem>
        );
      })}
    </Grid>

  );
};
