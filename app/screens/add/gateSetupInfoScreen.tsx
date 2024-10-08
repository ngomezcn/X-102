import { Button, ButtonText, ButtonSpinner, ButtonIcon } from '@/components/ui/button';

import { FormControlErrorText, FormControlErrorIcon, FormControl, FormControlHelper, FormControlHelperText, FormControlError, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";

import { ScrollView } from "react-native";
import { AlertCircleIcon, ArrowLeftIcon, ArrowRight, Blinds, Camera, ChevronDown, ChevronDownCircleIcon, ChevronRight, FileWarning, GlobeIcon, Key, LucideQrCode, MapPin, Plus, PlusCircleIcon, QrCode, QrCodeIcon, Scan, ScanLine, ScanQrCode, SearchCheck, Settings, Tablets, TriangleAlert } from "lucide-react-native";

import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";

const GateSetupInfoScreen = () => {

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

        <ScrollView
            className="w-full h-full"
            contentContainerStyle={{ flexGrow: 1 }}>
            <HStack className="w-full h-full bg-background-0 flex-grow justify-center">
                <VStack
                    className="relative hidden md:flex h-full w-full flex-1  items-center  justify-center"
                    space="md">
                </VStack>

                <VStack className="md:items-center md:justify-center flex-1 w-full  p-9 md:gap-10 gap-16 md:m-auto md:w-1/2 h-full">
                    <VStack className="max-w-[440px] w-full" space="md">

                        <HStack className="md:items-center" style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Pressable
                                onPress={() => {
                                    //router.back();
                                }}>
                                <Icon
                                    as={ArrowLeftIcon}
                                    className="md:hidden text-background-800"
                                    size="xl"
                                />
                            </Pressable>

                            <Text className="text-background-800">2/3</Text>
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
                                            placeholder="C/ Eras 36, Madarcos, Madrid"
                                            value={inputAddress}
                                            onChange={(e) => handleChangeAddress(e)}
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
                </VStack>
            </HStack>
        </ScrollView>



    );
};



export default GateSetupInfoScreen;
