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

type StepsLayoutProps = {
    children: React.ReactNode;
  };

export const StepsLayout = (props: StepsLayoutProps) => {
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
                        {props.children}
                    </VStack>
                </VStack>
            </HStack>
        </ScrollView>
    );
};