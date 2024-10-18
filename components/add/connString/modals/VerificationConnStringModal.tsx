import React, { useState, useEffect } from 'react';
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Spinner } from "@/components/ui/spinner";
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody } from "@/components/ui/modal";
import { Heading } from "@/components/ui/heading";
import { useDispatch, useSelector } from 'react-redux';
import { setConnString, setMac, setPassword, setDeviceNameInternal } from '@/store/slices/deviceSlice';
import { useToastUtil } from '@/components/ToastUtil';
import { RootState } from '@/store/store';
import { AppRoutes } from '@/utils/AppRoutes';
import { CheckCheck } from 'lucide-react-native';
import { CryptoManager } from '@/components/CryptoManager'
import NavigationService from '@/services/NavigationService';

interface VerificationConnStringModalProps {
    isOpen: boolean;
    onClose: () => void;
    finalFocusRef: React.RefObject<any>;
    connString: string;
}

export const VerificationConnStringModal: React.FC<VerificationConnStringModalProps> = ({ isOpen, onClose, finalFocusRef, connString }) => {
    const [displayText, setDisplayText] = useState<string>("Please Wait");
    const [completed, setCompleted] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { showToast } = useToastUtil(); // Use the toast utility

    const devices = useSelector((state: RootState) => state.device.devices);

    useEffect(() => {
        if (isOpen) {
            validateAndProcess();
        }
    }, [isOpen]);

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const updateDisplayText = async (text: string, delay: number) => {
        setDisplayText(text); // Cambiar el texto inmediatamente
        await sleep(delay); // Esperar el tiempo indicado
    };

    const validateAndProcess = async () => {

        try {

            await updateDisplayText("Procesando solicitud...", 500);

            const decrypted = CryptoManager.decode(connString)
            await updateDisplayText("Desencriptando...", 500);

            const values: string[] = decrypted.split(",");
            const mac = values[0];
            const deviceNameInternal = values[1];
            const password = values[2];

            // Verificar si ya existe la MAC
            const existingDevice = devices[mac];
            if (existingDevice) {
                showToast("Este dispositivo ya existe", 'error');
                onClose();
                return; // Salir si ya existe
            }
            await updateDisplayText("Verificando...", 1000);

            dispatch(setConnString(connString || ""));
            dispatch(setMac(mac));
            dispatch(setDeviceNameInternal(deviceNameInternal));
            dispatch(setPassword(password));

            await updateDisplayText("Finalizando...", 500);
            showToast("Código validado", 'success');
            setCompleted(true);
            await updateDisplayText("Finalizado", 100);

            NavigationService.navigate(AppRoutes.SetDeviceInfoScreen);

            setTimeout(() => {
                onClose();
            }, 200);

        } catch (error) {
            console.error("Error decrypting connString:", error);
            showToast("Error al verificar la conexión", 'error');
            onClose();
        }
    };

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
