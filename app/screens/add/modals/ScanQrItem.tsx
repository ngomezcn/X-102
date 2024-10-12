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
import { Button, ButtonIcon } from "@/components/ui/button";
import { ButtonText } from "@/components/ui/button";
import { BadgeText } from "@/components/ui/badge";
import { ScrollView } from "react-native";
import { ArrowRight, Blinds, BookKey, Camera, ChevronDown, ChevronDownCircleIcon, ChevronRight, FileKey, FileWarning, GlobeIcon, Key, LucideQrCode, Plus, PlusCircleIcon, QrCode, QrCodeIcon, Scan, ScanLine, ScanQrCode, Settings, Tablets, TriangleAlert } from "lucide-react-native";
import { NavigationTabs } from '@/app/navigation/NavigationTabs'
import * as RootNavigation from '@/app/navigation/RootNavigation';
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Pressable as RPressable } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal"
import { Textarea, TextareaInput } from "@/components/ui/textarea"

export const ScanQrItem = () => {
    return (
        <TouchableRipple
            onPress={() => RootNavigation.navigate(NavigationTabs.StepSetupInfoScreen)}
            rippleColor="rgba(0, 0, 0, .32)">
            <HStack className="justify-between">
                <HStack space="md">
                    <Icon as={ScanLine} />
                    <Text>Escanear QR</Text>
                    <Badge size="sm" variant="solid" action="muted">
                        <BadgeText>Recomendado</BadgeText>
                    </Badge>
                </HStack>
                <RPressable onPress={() => RootNavigation.navigate(NavigationTabs.StepSetupInfoScreen)}>

                    {({ pressed }) => (
                        <Icon
                            as={ChevronRight}
                            className={`${pressed ? "text-background-500" : "text-background-800"} md:hidden `}
                        />
                    )}
                </RPressable>
            </HStack>
        </TouchableRipple>
    );
};