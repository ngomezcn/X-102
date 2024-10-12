import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { ButtonGroup } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Badge } from "@/components/ui/badge";
import { BadgeText } from "@/components/ui/badge";
import { ScrollView } from "react-native";
import { Blinds, BookKey, Camera, ChevronDown, ChevronDownCircleIcon, ChevronRight, FileKey, FileWarning, GlobeIcon, Key, LucideQrCode, Plus, PlusCircleIcon, QrCode, QrCodeIcon, Scan, ScanLine, ScanQrCode, Settings, Tablets, TriangleAlert } from "lucide-react-native";
import { NavigationTabs } from '@/app/navigation/NavigationTabs'
import * as RootNavigation from '@/app/navigation/RootNavigation';
import { Icon } from "@/components/ui/icon";
import { Pressable as RPressable } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { ScanQrItem } from "./modals/ScanQrItem";
import { InputCodeItem } from "./modals/InputCodeItem";

const AddScreen = () => {

  return <>
    <ScrollView >
      <VStack className="px-5 py-4 flex-1" space="lg">

        <Heading className="md">Añadir Gate</Heading>

        <Divider />

        <VStack space="lg">
          <ScanQrItem />
          <InputCodeItem />
        </VStack>

        <Divider />

        <Box className="bg-background-50 p-4 rounded-md">
          <Text className="text-center font-medium">
            To view analytics you need client ID. Add it to your settings and
            you’re good to go.
          </Text>
        </Box>

      </VStack>
    </ScrollView>
  </>;
};

export default AddScreen;
