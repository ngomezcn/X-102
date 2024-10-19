import React from 'react';
import { useHeading } from '@/context/HeadingContext';
import { HStack } from "../ui/hstack";
import { Pressable } from "../ui/pressable";
import { Icon } from "../ui/icon";
import { ChevronLeftIcon, HelpCircle } from "lucide-react-native";
import { Heading } from "@/components/ui/heading";

const AppHeader: React.FC = () => {
    const { heading, toggleIconVisibility, hiddenIcon, isHeaderVisible } = useHeading();

    if (!isHeaderVisible) {
        return null; 
    }

    return (
        <HStack style={{ height: 60 }} className="bg-white items-center justify-between border-b border-gray-100 px-5">
            <HStack className="items-center">
                <Pressable>
                    <Icon as={ChevronLeftIcon} />
                </Pressable>
                <Heading className="md">{heading}</Heading>
            </HStack>
            {!hiddenIcon && (
                <Pressable onPress={toggleIconVisibility}>
                    <Icon as={HelpCircle} className="ml-auto" />
                </Pressable>
            )}
        </HStack>
    );
};

export default AppHeader;
