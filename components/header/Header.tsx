import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import log from '@/utils/logger';
import NavigationService from '@/services/NavigationService';
import { Profile } from "@/components/access/Profile";
import { DeviceList } from "@/components/access/DeviceList";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { NoDevicesMessage } from "@/components/access/NoDevicesMessage";
import { VStack } from "@/components/ui/vstack";
import { useToastUtil } from "@/components/ToastUtil";
import { HStack } from "../ui/hstack";
import { Pressable } from "../ui/pressable";
import { Icon } from "../ui/icon";
import { ChevronLeftIcon, HelpCircle } from "lucide-react-native";

const AppHeader = () => {
    return (
        <>
            <HStack style={{ height: 60 }} className="bg-white items-center justify-between border-b border-gray-100 px-5">
                <HStack className="items-center">
                    <Pressable>
                        <Icon as={ChevronLeftIcon} />
                    </Pressable>
                    <Heading className="md">Acceso</Heading>
                </HStack>
                <Pressable>
                    <Icon as={HelpCircle} className="ml-auto" />
                </Pressable>
            </HStack>
        </>
    );
};

export default AppHeader;