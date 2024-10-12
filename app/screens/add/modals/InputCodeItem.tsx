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
import { VerificationModal } from "./VerificationModal"
import { resetDevice } from '@/features/device/deviceSlice';


interface ConnStringModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContinue: (connString: string) => void; 
    finalFocusRef: React.RefObject<any>;
}

const connStringSchema = z.object({
    connString: z.string().min(1, "Código de acceso requerido"),
});

type ConnStringSchemaType = z.infer<typeof connStringSchema>;

const ConnStringModal: React.FC<ConnStringModalProps> = ({ isOpen, onClose, onContinue, finalFocusRef }) => {
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ConnStringSchemaType>({
        resolver: zodResolver(connStringSchema),
    });

    const onSubmit = (data: ConnStringSchemaType) => {
        dispatch(resetDevice()); // Nos aseguramos que el objeto temporal no tiene datos
        onContinue(data.connString);  
        reset();
        onClose();
    };

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
                    <FormControl
                        isInvalid={!!errors?.connString}
                        className="w-full">
                        
                        <Controller
                            defaultValue=""
                            name="connString"
                            control={control}
                            rules={{
                                validate: async (value) => {
                                    try {
                                        await connStringSchema.parseAsync({ connString: value });
                                        return true;
                                    } catch (error: any) {
                                        return error.message;
                                    }
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Textarea>
                                    <TextareaInput
                                        //@ts-ignore
                                        value={value}
                                        onChangeText={onChange}/>
                                </Textarea>
                            )}
                        />
                        <FormControlError>
                            <FormControlErrorIcon as={AlertTriangle} />
                            <FormControlErrorText>
                                {errors?.connString?.message}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>

                </ModalBody>
                <ModalFooter>
                    <Button variant="outline" action="secondary" onPress={onClose} >
                        <ButtonText>Cancelar</ButtonText>
                    </Button>
                    
                    <Button onPress={handleSubmit(onSubmit)}>
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
                <ConnStringModal
                    isOpen={showAccessModal}
                    onClose={() => setShowAccessModal(false)}
                    onContinue={(code: string) => { 
                        setConnString(code);        
                        setShowVerificationModal(true);
                    }}
                    finalFocusRef={accessModalRef}
                />
                <VerificationModal
                    isOpen={showVerificationModal}
                    onClose={() => setShowVerificationModal(false)}
                    finalFocusRef={verificationModalRef}
                    connString={connString}         
                />
            </HStack>
        </TouchableRipple>
    );
};
