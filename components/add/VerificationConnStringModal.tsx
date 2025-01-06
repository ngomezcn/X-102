import React, { useState, useEffect } from 'react';
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Spinner } from "@/components/ui/spinner";
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody } from "@/components/ui/modal";
import { Heading } from "@/components/ui/heading";
import { useDispatch, useSelector } from 'react-redux';
import { setDeviceName, startWizard, setInternalDeviceName, setConnectionString, setConnectionType, setConnectionStrategy } from '@/store/slices/deviceWizardSlice';
import { useToastUtil } from '@/components/ToastUtil';
import { RootState } from '@/store/store';
import { AppRoutes } from '@/constants/AppRoutes';
import { CheckCheck } from 'lucide-react-native';
import { CryptoManager } from '@/components/CryptoManager'
import NavigationService from '@/services/NavigationService';
import { BLESpecifications, WiFiSpecifications } from '@/models/Specifications';
import { deviceExists } from '@/utils/DeviceUtils';
import { BLEConnection, WiFiConnection } from '@/models/Connection';

interface VerificationConnStringModalProps {
    isOpen: boolean;
    onClose: () => void;
    finalFocusRef: React.RefObject<any>;
    connString: string;
}

export const VerificationConnStringModal: React.FC<VerificationConnStringModalProps> = ({ isOpen, onClose, finalFocusRef, connString: connectionString }) => {
    const [displayText, setDisplayText] = useState<string>("Please Wait");
    const [completed, setCompleted] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { showToast } = useToastUtil();

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

            const decrypted = CryptoManager.decode(connectionString.trim())
            await updateDisplayText("Desencriptando...", 500);

            const values: string[] = decrypted.split(",");

            const connectionType = values[0];
            const macBluetooth = values[1];
            const internalDeviceName = values[2];
            const accessKey = values[3];

            if (deviceExists(devices, connectionString)) {
                console.warn('El dispositivo con este connectionString ya existe');
                showToast("Este dispositivo ya existe", 'error');
                onClose();
                return;
            }

            await updateDisplayText("Verificando...", 1000);

            dispatch(startWizard());
            dispatch(setInternalDeviceName(internalDeviceName));
            dispatch(setConnectionString(connectionString));
            dispatch(setConnectionType(connectionType));

            if (connectionType === 'BLE') {
                const specifications: BLESpecifications = { type: 'BLE', mac: macBluetooth, accessKey: accessKey };
                const connection = new BLEConnection(specifications);

                dispatch(setConnectionStrategy(connection));

            } else if (connectionType === 'WiFi') {
                const specifications: WiFiSpecifications = { type: 'WiFi' };
                const connection = new WiFiConnection(specifications);

                dispatch(setConnectionStrategy(connection));
            }

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
