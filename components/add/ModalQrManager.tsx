

import React, { useState } from "react";
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
import { AppRoutes } from '@/constants/AppRoutes'
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
import NavigationService from "@/services/NavigationService";
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { ChevronRight, ScanLine } from "lucide-react-native";

export const ModalQrManager = () => {

    const [permission, requestPermission] = useCameraPermissions();
    const [loading, setLoading] = useState(false);

    const handlePress = async () => {
        setLoading(true);
        if (!permission || !permission.granted) {
            const { granted } = await requestPermission();
            if (!granted) {
                setLoading(false);
                alert("Se necesitan permisos de cámara para escanear QR.");
                return;
            }
        }
        setLoading(false);
        NavigationService.navigate(AppRoutes.ScanQR);
    };

    return (
        <TouchableRipple
            //onPress={() => NavigationService.navigate(AppRoutes.ScanQR)}
            onPress={handlePress}

            rippleColor="rgba(0, 0, 0, .32)">
            <HStack className="justify-between">
                <HStack space="md">
                    <Icon as={ScanLine} />
                    <Text>Escanear QR</Text>
                    <Badge size="sm" variant="solid" action="muted">
                        <BadgeText>Recomendado</BadgeText>
                    </Badge>
                </HStack>
                <RPressable onPress={() => handlePress()}>

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