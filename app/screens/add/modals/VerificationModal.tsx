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
import { setConnString, setMac, setPin, setDeviceNameInternal } from '@/features/device/deviceSlice';

interface VerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    finalFocusRef: React.RefObject<any>;
    connString: string | null;  
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose, finalFocusRef, connString }) => {
    const [displayText, setDisplayText] = useState<string>("Please Wait");
    const [completed, setCompleted] = useState<boolean>(false);
    const dispatch = useDispatch();

    const textAnimationData = [
        { "texto": "Procesando solicitud...", "tiempo": 1000 },
        { "texto": "Desencriptando...", "tiempo": 1300 },
        { "texto": "Verificando...", "tiempo": 1900 },
        { "texto": "Finalizando...", "tiempo": 600 }
    ];

    useEffect(() => {
        if (isOpen) {
            let currentIndex = 0;

            const completed = () => {
                setDisplayText("Completado");
                setCompleted(true);

                setTimeout(() => {
                    onClose()
                    
                    dispatch(setConnString(connString || ""));
                    dispatch(setMac("data.connString"));
                    dispatch(setPin("data.connString"));
                    dispatch(setDeviceNameInternal("9037-XY"))

                    RootNavigation.navigate(NavigationTabs.SetDeviceInfoScreen)
                }, 1000);
            }

            const updateText = () => {
                if (currentIndex < textAnimationData.length) {
                    const { texto, tiempo } = textAnimationData[currentIndex];
                    setDisplayText(texto);

                    setTimeout(() => {
                        currentIndex++;
                        updateText();
                    }, tiempo);
                } else {
                    completed();
                }
            };

            updateText();

            return () => {
                currentIndex = 0;
                setCompleted(false);
            };
        }
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            finalFocusRef={finalFocusRef}
            size="md"
        >
            <ModalBackdrop onPress={false ? onClose : undefined} />
            <ModalContent>
                <ModalHeader>
                    <Heading size="md" className="text-typography-950 opacity-0">
                        .
                    </Heading>
                </ModalHeader>

                <ModalBody>
                    <HStack space="sm" className="flex justify-center items-center space-x-2">


                        {completed ? (
                            <Icon as={CheckCheck} size="md" />
                        ) : (
                            <Spinner size="small" color="#5e5f5f" />
                        )}

                        <Text className="text-md">{displayText}</Text> 
                    </HStack >
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};