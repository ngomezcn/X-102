import React, { useState, useEffect } from 'react';
import { HStack } from "@/components/ui/hstack";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { TouchableRipple } from 'react-native-paper';
import { Pressable as RPressable } from 'react-native';
import { AlertTriangle, ArrowRight, BookKey, CheckCheck, ChevronRight } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@/components/ui/modal";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";
import * as RootNavigation from '@/app/navigation/RootNavigation';
import { NavigationTabs } from '@/app/navigation/NavigationTabs';
import { FormControl, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText, FormControlError, FormControlErrorIcon, FormControlErrorText } from '@/components/ui/form-control';
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { useDispatch } from 'react-redux'; 
import { VerificationConnStringModal } from "./modals/VerificationConnStringModal"
import { resetDevice } from '@/features/device/deviceSlice';
import { InputConnStringModal } from './modals/InputConnStringModal';

export const ConnStringManager = () => {
    const [showAccessModal, setShowAccessModal] = useState(false);
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const accessModalRef = React.useRef(null); 
    const verificationModalRef = React.useRef(null);

    const [connString, setConnString] = useState<string | null>(null);

    return (
        <TouchableRipple
            onPress={() => setShowAccessModal(true)}
            ref={accessModalRef}
            rippleColor="rgba(0, 0, 0, .32)"
        >
            <HStack className="justify-between">
             
                <HStack space="md">
                    <Icon as={BookKey} />
                    <Text>Introducir código de acceso</Text>
                </HStack>
                <RPressable onPress={() => setShowAccessModal(true)} ref={accessModalRef}>
                    {({ pressed }) => (
                        <Icon
                            as={ChevronRight}
                            className={`${pressed ? "text-background-500" : "text-background-800"} md:hidden `}
                        />
                    )}
                </RPressable>
                <InputConnStringModal
                    isOpen={showAccessModal}
                    onClose={() => setShowAccessModal(false)}
                    onContinue={(code: string) => { 
                        setConnString(code);        
                        setShowVerificationModal(true);
                    }}
                    finalFocusRef={accessModalRef}
                />
                <VerificationConnStringModal
                    isOpen={showVerificationModal}
                    onClose={() => setShowVerificationModal(false)}
                    finalFocusRef={verificationModalRef}
                    connString={connString || ""} /// TODO: Fixear esto debe asegurase el string         
                />
            </HStack>
        </TouchableRipple>
    );
};
