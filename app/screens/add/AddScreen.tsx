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
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Badge } from "@/components/ui/badge";
import { BadgeText } from "@/components/ui/badge";
import { BadgeIcon } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { ModalContent } from "@/components/ui/modal";
import { ModalCloseButton } from "@/components/ui/modal";
import { ModalBackdrop } from "@/components/ui/modal";
import { ModalHeader } from "@/components/ui/modal";
import { ModalBody } from "@/components/ui/modal";
import { ModalFooter } from "@/components/ui/modal";
import { ScrollView } from "react-native";
import { Blinds, BookKey, Camera, ChevronDown, ChevronDownCircleIcon, ChevronRight, FileKey, FileWarning, GlobeIcon, Key, LucideQrCode, Plus, PlusCircleIcon, QrCode, QrCodeIcon, Scan, ScanLine, ScanQrCode, Settings, Tablets, TriangleAlert } from "lucide-react-native";
import { TabLabels } from '@/app/navigation/NavigationTabs'

const AddScreen = () => {

  const [showModal, setShowModal] = React.useState(false)
  const ref = React.useRef(null)

  return <>
    <ScrollView >
      <VStack className="px-5 py-4 flex-1" space="lg">
        <Heading className="md">Añadir Gate</Heading>

        <Divider />
        <PersonalInfoSection />
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

const PersonalInfoSection = () => {
  return (
    <VStack space="lg">
      <HStack className="justify-between">
        <HStack space="md">
          <Icon as={ScanLine} />
          <Text>Escanear QR</Text>
          <Badge size="sm" variant="solid" action="muted">
            <BadgeText>Recomendado</BadgeText>
          </Badge>
        </HStack>
        <Pressable>
          <Icon as={ChevronRight} />
        </Pressable>
      </HStack>
      <HStack className="justify-between">
        <HStack space="md">
          <Icon as={BookKey} />
          <Text>Introducir código de acceso</Text>
        </HStack>
        <Pressable>
          <Icon as={ChevronRight} />
        </Pressable>
      </HStack>
    </VStack>
  );
};