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
import { useSelector } from 'react-redux';
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { StepsLayout } from './StepsLayout';
import { RootState } from "@/app/store"

const PairDeviceScreen = () => {
    return (
        <></>
    );
};

export default PairDeviceScreen;

