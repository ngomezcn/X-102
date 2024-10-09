import { Button, ButtonText, ButtonSpinner, ButtonIcon } from '@/components/ui/button';

import { FormControlErrorText, FormControlErrorIcon, FormControl, FormControlHelper, FormControlHelperText, FormControlError, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
//import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import * as RootNavigation from '@/app/navigation/RootNavigation';
import { ScrollView } from "react-native";
import { AlertCircleIcon, ArrowLeftIcon, ArrowRight, Blinds, Camera, ChevronDown, ChevronDownCircleIcon, ChevronRight, FileWarning, GlobeIcon, Key, LucideQrCode, MapPin, Plus, PlusCircleIcon, QrCode, QrCodeIcon, Scan, ScanLine, ScanQrCode, SearchCheck, Settings, Tablets, TriangleAlert } from "lucide-react-native";
import { Pressable as RPressable, StyleSheet, View } from 'react-native';

import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { StepsLayout } from './StepsLayout';

const StepSetupInfoScreen = () => {

    const [isInvalid, setIsInvalid] = React.useState(false)
    const [inputName, setInputName] = React.useState("")
    const [inputAddress, setInputAddress] = React.useState("")

    const handleChangeName = (value: any) => {
        if (value.length < 1) {
            setIsInvalid(true)
        } else {
            setIsInvalid(false)
        }
        setInputName(value);
    }

    const handleChangeAddress = (value: any) => {
        setInputAddress(value);
    }

    const handleContinue = () => {

        handleChangeName(inputName)
        handleChangeAddress(inputAddress)

        if (!isInvalid && inputName && inputAddress) {
            console.log("Continuar con:", { inputName, inputAddress });
        } else {
            console.log("Por favor, completa los campos correctamente.");
        }
    }

    return (

        <StepsLayout>

            <VStack className="max-w-[440px] w-full" space="md">
                <HStack className="md:items-center" style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                    <RPressable
                        onPress={() => {
                            RootNavigation.goBack();
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
                        <Text>Gate 9037-XY</Text>
                    </VStack>
                </VStack>
                <VStack className="w-full">
                    <VStack space="xl" className="w-full">
                        <FormControl
                            isInvalid={isInvalid}
                            size="md"
                            isDisabled={false}
                            isReadOnly={false}
                            isRequired={false}>
                            <FormControlLabel>
                                <FormControlLabelText>Nombre</FormControlLabelText>
                            </FormControlLabel>
                            <Input className="my-1" >
                                <InputSlot className="pl-3">
                                    <InputIcon as={SearchCheck} />
                                </InputSlot>
                                <InputField
                                    placeholder="Mi casa, garaje, puerta principal..."
                                    value={inputName}

                                    // @ts-ignore
                                    onChange={(e) => handleChangeName(e.target.value)}
                                />
                            </Input>
                        </FormControl>

                        <FormControl
                            size="md"
                            isDisabled={false}
                            isReadOnly={false}
                            isRequired={false}>
                            <FormControlLabel>
                                <FormControlLabelText>Dirección</FormControlLabelText>
                            </FormControlLabel>
                            <Input className="my-1" >
                                <InputSlot className="pl-3">
                                    <InputIcon as={MapPin} />
                                </InputSlot>
                                <InputField
                                    placeholder="C/ Eras 36, Madarcos, Madrid (opcional)"
                                    value={inputAddress}

                                    // @ts-ignore
                                    onChange={(e) => handleChangeAddress(e.target.value)}
                                />
                            </Input>
                        </FormControl>
                    </VStack>
                </VStack>
                <VStack className="w-full my-4 " space="lg">
                    <Button className="w-full" onPress={handleContinue}>
                        <ButtonText className="font-medium">Continuar</ButtonText>
                        <ButtonIcon as={ArrowRight} />
                    </Button>
                </VStack>
            </VStack>
        </StepsLayout>
    );
};

export default StepSetupInfoScreen;

