import React, { useState } from "react";

import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { bottomTabs } from './NavigationTabs'; // Ajusta la ruta de importación
import * as RootNavigation from '@/app/navigation/RootNavigation';

// TODO: Crear subscriber del navigation
const BottomNavigationView = () => {

  const [currentRoute, setCurrentRoute] = useState(RootNavigation.getCurrentRoute());

  const handleNavigation = (label : string) => {
    setCurrentRoute(label);
    RootNavigation.navigate(label); 
  };

  return (
    <HStack className="content-center absolute bottom-0 justify-between w-full py-3 px-6 md:hidden">
      {bottomTabs.map((tab) => (
        <Pressable
          key={tab.label}
          onPress={() => handleNavigation(tab.label)}
          disabled={tab.disabled}
          //@ts-ignore
          opacity={tab.disabled ? 0.5 : 1} 
        >
          <VStack className="items-center">
            <Icon
              as={tab.icon}
              size="lg"
              className={`${
                currentRoute === tab.label
                  ? "text-typography-900"
                  : "text-typography-400"
              }`}
            />
            <Text
              size="xs"
              className={`${
                currentRoute === tab.label
                  ? "text-typography-900"
                  : "text-typography-400"
              }`}
            >
              {tab.label}
            </Text>
          </VStack>
        </Pressable>
      ))}
    </HStack>
  );
};

export default BottomNavigationView;
