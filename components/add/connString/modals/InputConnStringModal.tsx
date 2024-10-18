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
import { AppRoutes } from '@/constants/AppRoutes';
import { FormControl, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText, FormControlError, FormControlErrorIcon, FormControlErrorText } from '@/components/ui/form-control';
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { useDispatch } from 'react-redux'; 
import { VerificationConnStringModal } from "./VerificationConnStringModal"
import { resetDevice } from '@/store/slices/deviceSlice';

const inputConnStringModalSchema = z.object({
    connString: z.string().min(1, "Código de acceso requerido"),
});

type InputConnStringModalSchemaType = z.infer<typeof inputConnStringModalSchema>;

interface ConnStringModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContinue: (connString: string) => void; 
    finalFocusRef: React.RefObject<any>;
}

export const InputConnStringModal: React.FC<ConnStringModalProps> = ({ isOpen, onClose, onContinue, finalFocusRef }) => {
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InputConnStringModalSchemaType>({
        resolver: zodResolver(inputConnStringModalSchema),
    });

    const onSubmit = (data: InputConnStringModalSchemaType) => {
        dispatch(resetDevice()); // Nos aseguramos que el objeto para crear el device temporal no tiene datos
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
                                        await inputConnStringModalSchema.parseAsync({ connString: value });
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
