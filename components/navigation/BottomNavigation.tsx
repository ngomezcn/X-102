import React, { useState } from "react";

import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { bottomTabs } from '@/constants/AppRoutes'; // Ajusta la ruta de importación
import NavigationService from "@/services/NavigationService";
import { tabRoutes } from "@/constants/TabRoutes";
import { AppRoutes } from "@/constants/AppRoutes";

const BottomNavigationView = () => {

  const [currentRoute, setCurrentRoute] = useState(NavigationService.getCurrentRoute());

  const handleNavigation = (label : string) => {
    setCurrentRoute(label);
    NavigationService.navigate(label); 
  };

  const isTabVisible = tabRoutes.includes(currentRoute);

  if (!isTabVisible) {
    //return null;
  }

  return (
    <HStack className="content-center absolute bottom-0 justify-between w-full py-3 px-6 md:hidden">
      {bottomTabs.map((tab) => (
        <Pressable
          key={tab.id}
          onPress={() => handleNavigation(tab.id)}
          disabled={tab.disabled}
          //@ts-ignore
          opacity={tab.disabled ? 0.5 : 1} 
        >
          <VStack className="items-center">
            <Icon
              as={tab.icon}
              size="lg"
              className={`${
                currentRoute === tab.id
                  ? "text-typography-900"
                  : "text-typography-400"
              }`}
            />
            <Text
              size="xs"
              className={`${
                currentRoute === tab.id
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
