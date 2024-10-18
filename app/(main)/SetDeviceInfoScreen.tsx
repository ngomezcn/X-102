import { Button, ButtonText, ButtonSpinner, ButtonIcon } from '@/components/ui/button';

import { FormControlErrorText, FormControlErrorIcon, FormControl, FormControlHelper, FormControlHelperText, FormControlError, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
//import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import { ScrollView } from "react-native";
import { AlertCircleIcon, AlertTriangle, ArrowLeftIcon, ArrowRight, Blinds, Camera, ChevronDown, ChevronDownCircleIcon, ChevronRight, FileWarning, GlobeIcon, Key, LucideQrCode, MapPin, Plus, PlusCircleIcon, QrCode, QrCodeIcon, Scan, ScanLine, ScanQrCode, SearchCheck, Settings, Tablets, TriangleAlert } from "lucide-react-native";
import { Pressable as RPressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { StepsLayout } from '../../components/add/StepsLayout';
import { RootState } from "@/store/store"
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from 'react-redux';
import { setDeviceName, setDeviceAddress, } from '@/store/slices/deviceSlice';
import { AppRoutes } from '@/utils/AppRoutes';
import NavigationService from '@/services/NavigationService';

const inputSchema = z.object({
    deviceName: z.string().min(1, "Información obligatoria"),
    deviceAddress: z.string().optional()
});

type InputSchemaType = z.infer<typeof inputSchema>;

const SetDeviceInfoScreen = () => {

    const dispatch = useDispatch();
    const deviceNameInternal = useSelector((state: RootState) => state.device.currentDevice.deviceNameInternal);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InputSchemaType>({
        resolver: zodResolver(inputSchema),
    });

    const onSubmit = (data: InputSchemaType) => {

        const address = data.deviceAddress !== undefined ? data.deviceAddress : '';
        dispatch(setDeviceAddress(address));
        dispatch(setDeviceName(data.deviceName)); // SIEMPRE PASAR EL DEVICE NAME COMO SEGUNDO
 
       reset();

        NavigationService.navigate(AppRoutes.Access)
    };

    return (

        <StepsLayout>
            <VStack className="max-w-[440px] w-full" space="md">
                <HStack className="md:items-center" style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                    <RPressable
                        onPress={() => {
                            NavigationService.goBack();
                        }}>

                        {({ pressed }) => (
                            <Icon
                                as={ArrowLeftIcon}
                                className={`${pressed ? "text-background-500" : "text-background-800"} md:hidden `}
                                size="xl"
                            />
                        )}

                    </RPressable>

                    <Text className="text-background-800 font-medium">2/3</Text>
                </HStack>
                <VStack className="md:items-center" space="md">
                    <VStack>
                        <Heading className="md:text-center" size="3xl">Indicar información</Heading>
                        <Text>{deviceNameInternal}</Text>
                    </VStack>
                </VStack>
                <VStack className="w-full">
                    <VStack space="xl" className="w-full">

                        <FormControl
                            isInvalid={!!errors?.deviceName}>

                            <FormControlLabel>
                                <FormControlLabelText>Nombre</FormControlLabelText>
                            </FormControlLabel>

                            <Controller
                                defaultValue=""
                                name="deviceName"
                                control={control}
                                rules={{
                                    validate: async (value) => {
                                        try {
                                            await inputSchema.parseAsync({ deviceName: value });
                                            return true;
                                        } catch (error: any) {
                                            return error.message;
                                        }
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input className="my-1" >
                                        <InputSlot className="pl-3">
                                            <InputIcon as={SearchCheck} />
                                        </InputSlot>
                                        <InputField
                                            placeholder="Mi casa, garaje, puerta principal..."
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                    </Input>
                                )}
                            />
                            <FormControlError>
                                <FormControlErrorIcon as={AlertTriangle} />
                                <FormControlErrorText>
                                    {errors?.deviceName?.message}
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>

                        <FormControl
                            isInvalid={!!errors?.deviceAddress}>

                            <FormControlLabel>
                                <FormControlLabelText>Dirección</FormControlLabelText>
                            </FormControlLabel>

                            <Controller
                                defaultValue=""
                                name="deviceAddress"
                                control={control}
                                rules={{
                                    validate: async (value) => {
                                        try {
                                            await inputSchema.parseAsync({ deviceAddress: value });
                                            return true;
                                        } catch (error: any) {
                                            return error.message;
                                        }
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input className="my-1" >
                                        <InputSlot className="pl-3">
                                            <InputIcon as={MapPin} />
                                        </InputSlot>
                                        <InputField
                                            placeholder="C/ Eras 36, Madarcos, Madrid (opcional)"
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                    </Input>
                                )}
                            />
                            <FormControlError>
                                <FormControlErrorIcon as={AlertTriangle} />
                                <FormControlErrorText>
                                    {errors?.deviceAddress?.message}
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>
                    </VStack>
                </VStack>
                <VStack className="w-full my-4 " space="lg">
                    <Button className="w-full" onPress={handleSubmit(onSubmit)}>
                        <ButtonText className="font-medium">Continuar</ButtonText>
                        <ButtonIcon as={ArrowRight} />
                    </Button>
                </VStack>
            </VStack>
        </StepsLayout>
    );
};

export default SetDeviceInfoScreen;
