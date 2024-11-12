import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';

import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useEffect, useState } from "react";
//import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { AppRoutes } from '@/constants/AppRoutes';
import NavigationService from '@/services/NavigationService';
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, ArrowLeftIcon, ArrowRight, MapPin, SearchCheck } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { Pressable as RPressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { z } from "zod";
import { StepsLayout } from '../../components/add/StepsLayout';
import { setDeviceLocation, setDeviceName, resetWizard } from '@/store/slices/deviceWizardSlice';

import { completeWizardDevice } from '@/store/slices/deviceSlice';

const inputSchema = z.object({
    deviceName: z.string().min(1, "Información obligatoria"),
    deviceAddress: z.string().optional()
});

type InputSchemaType = z.infer<typeof inputSchema>;

const SetDeviceInfoScreen = () => {
    const dispatch = useDispatch();
    const wizardDevice = useSelector((state: RootState) => state.wizard);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InputSchemaType>({
        resolver: zodResolver(inputSchema),
    });

    const onSubmit = (data: InputSchemaType) => {
        const location = data.deviceAddress?.trim() ? data.deviceAddress : 'Dirección del acceso sin especificar';
        
        // Realizamos los dispatch con los valores directamente
        dispatch(setDeviceName(data.deviceName));
        dispatch(setDeviceLocation(location));

        // Enviar los datos directamente sin esperar a que Redux se actualice
        const updatedWizardDevice = {
            ...wizardDevice,
            name: data.deviceName,
            location: location,
        };

        dispatch(completeWizardDevice(updatedWizardDevice));
        dispatch(resetWizard());

        reset(); // Reset del formulario

        NavigationService.navigate(AppRoutes.Access);
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
                        <Text>{wizardDevice.internalDeviceName}</Text>
                        <Text>{wizardDevice.specifications?.type}</Text>

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

