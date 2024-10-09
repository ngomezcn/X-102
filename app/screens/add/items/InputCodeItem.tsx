import React, { useState, useEffect } from 'react';
import { HStack } from "@/components/ui/hstack";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { TouchableRipple } from 'react-native-paper';
import { Pressable as RPressable } from 'react-native';
import { ArrowRight, BookKey, CheckCheck, ChevronRight } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@/components/ui/modal";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";
import * as RootNavigation from '@/app/navigation/RootNavigation';
import { NavigationTabs } from '@/app/navigation/NavigationTabs';
import { FormControl, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';

interface AccessCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContinue: () => void; // Nuevo prop para manejar el continuar
    finalFocusRef: React.RefObject<any>;
}

interface VerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    finalFocusRef: React.RefObject<any>;
}

const textAnimationData = [
    { "texto": "Procesando solicitud...", "tiempo": 1000 },
    { "texto": "Desencriptando...", "tiempo": 1300 },
    { "texto": "Verificando...", "tiempo": 1900 },
    { "texto": "Finalizando...", "tiempo": 600 }
];

const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose, finalFocusRef }) => {
    const [displayText, setDisplayText] = useState<string>("Please Wait");
    const [completed, setCompleted] = useState<boolean>(false); // Nuevo estado para saber si completó

    useEffect(() => {
        if (isOpen) {
            let currentIndex = 0;

            const completed = () => {
                setDisplayText("Completado");
                setCompleted(true); // Marca como completado

                setTimeout(() => {
                    onClose()
                    RootNavigation.navigate(NavigationTabs.StepSetupInfoScreen)
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

            updateText(); // Comienza la animación

            return () => {
                currentIndex = 0; // Resetea el índice si el modal se cierra
                setCompleted(false); // Resetear estado completado si el modal se cierra
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

                        <p className="text-md">{displayText}</p>
                    </HStack >
                </ModalBody>


            </ModalContent>
        </Modal>
    );
};

const AccessCodeModal: React.FC<AccessCodeModalProps> = ({ isOpen, onClose, onContinue, finalFocusRef }) => {

    const [buttonIsEnabled, setButtonIsEnabled] = React.useState(false)
    const [accessCode, setAccessCode] = React.useState("")

    const handleTextArea = (value: any) => {

        if (value.length < 1) {
            setButtonIsEnabled(false)

        } else {
            setButtonIsEnabled(true)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            finalFocusRef={finalFocusRef}
            size="md"
        >
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <Heading size="md" className="text-typography-950">
                        Introducir código de acceso
                    </Heading>
                    <ModalCloseButton>
                        <Icon
                            as={CloseIcon}
                            size="md"
                            className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                        />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>

                    <FormControl size="sm">
                       {/*<FormControlLabel>
                            <FormControlLabelText>Copie i pege el codigo aqui</FormControlLabelText>
                        </FormControlLabel> */}
                        <Textarea>
                            
                            <TextareaInput

                                //@ts-ignore
                                onChange={(e) => handleTextArea(e.target.value)}
                                placeholder="Once upon a time..." />
                        </Textarea>
                        {/*<FormControlHelper>
                            <FormControlHelperText>Copie i pegue el codigo</FormControlHelperText>
                        </FormControlHelper> */}
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button variant="outline" action="secondary" onPress={onClose} >
                        <ButtonText>Cancelar</ButtonText>
                    </Button>
                    <Button isDisabled={!buttonIsEnabled} onPress={() => {
                        onContinue();
                        onClose();
                    }}>
                        <ButtonText>Continuar</ButtonText>
                        <ButtonIcon as={ArrowRight} />
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export const InputCodeItem = () => {
    const [showAccessModal, setShowAccessModal] = useState(false);
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const accessModalRef = React.useRef(null); // Ref para el modal de acceso
    const verificationModalRef = React.useRef(null); // Ref para el modal de verificación

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
                <AccessCodeModal
                    isOpen={showAccessModal}
                    onClose={() => setShowAccessModal(false)}
                    onContinue={() => setShowVerificationModal(true)} // Abre el modal de verificación
                    finalFocusRef={accessModalRef}
                />
                <VerificationModal
                    isOpen={showVerificationModal}
                    onClose={() => setShowVerificationModal(false)}
                    finalFocusRef={verificationModalRef}
                />
            </HStack>
        </TouchableRipple>
    );
};
