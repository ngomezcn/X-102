import { Button, ButtonText, ButtonSpinner, ButtonIcon } from '@/components/ui/button';

import { FormControl, FormControlHelper, FormControlHelperText, FormControlError, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { ButtonGroup } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { ScrollView, View } from "react-native";
import { Blinds, ChevronDown, ChevronDownCircleIcon, FileWarning, Plus, PlusCircleIcon, Settings, Tablets, TriangleAlert } from "lucide-react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationTabs } from '@/app/navigation/NavigationTabs'
import { router } from "expo-router";
import * as RootNavigation from '@/app/navigation/RootNavigation';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { NoDevicesMessage } from '@/components/access/NoDevicesMessage';
import { DeviceList } from '@/components/access/DeviceList';

const AccessScreen = () => {
  const devices = useSelector((state: RootState) => state.device.devices);
  const deviceList = Object.values(devices);

  return <>
    <VStack className={`px-5 py-4 flex- w-full `} space="lg">
      <Heading className="md">Acceso</Heading>

      {deviceList.length > 0 ? (
        <DeviceList  />
      ) : (
        <NoDevicesMessage />
      )}

    </VStack>
  </>;
};
export default AccessScreen;
