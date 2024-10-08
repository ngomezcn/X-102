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
import { ScrollView } from "react-native";
import { Blinds, ChevronDown, ChevronDownCircleIcon, FileWarning, Plus, PlusCircleIcon, Settings, Tablets, TriangleAlert } from "lucide-react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabLabels } from '@/app/navigation/NavigationTabs'

import { router } from "expo-router";

type AccessScreenProps = {
  navigation : any;
};

const AccessScreen = (navigation : AccessScreenProps) => {

  return <>
    <VStack className={`px-5 py-4 flex- w-full `} space="lg">
      <Heading className="md">Acceso</Heading>

      <NoAccessConfigured/>

      <Button
        action="secondary"
        variant="outline"
        onPress={() => {

          // @ts-ignore
          navigation.push('Add')
          
        }} >
        <ButtonIcon as={PlusCircleIcon} />
        <ButtonText>XDConfigurar dispositivo</ButtonText>
      </Button>
    </VStack>
  </>;
};
export default AccessScreen;

interface NoAccessConfiguredProps {
  settActiveTab?: (tab: string) => void;
}

const NoAccessConfigured: React.FC<{settActiveTab?: (tab: string) => void;}> = ({ settActiveTab }) => {
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

          // @ts-ignore
          router.push("accessscreen");
() => navigation.push('Details')
          
        }} >
        <ButtonIcon as={PlusCircleIcon} />
        <ButtonText>Configurar dispositivo</ButtonText>
      </Button>
    </Box>
  );
};


