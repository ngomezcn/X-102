import React, { useEffect, useState } from "react";
import NavigationService from "@/services/NavigationService";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { View } from 'react-native';
import { bottomTabs } from '@/constants/AppRoutes';
import { tabRoutes } from "@/constants/TabRoutes";

const BottomNavigationView = () => {
  const [currentRoute, setCurrentRoute] = useState<string | null>(NavigationService.getCurrentRoute());

  useEffect(() => {
    // Suscríbete a los cambios en la ruta actual
    const unsubscribe = NavigationService.subscribe((_, newRoute) => {
      console.log('Cambio de ruta detectado: ', newRoute);
      setCurrentRoute(newRoute);
    });

    return () => {
      unsubscribe(); // Limpia la suscripción al desmontar
    };
  }, []);

  const handleNavigation = (label: string) => {
    NavigationService.navigate(label);
  };

  const isTabVisible = currentRoute && tabRoutes.includes(currentRoute);

  if (!isTabVisible) {
    return null;
  }

  return (
    <View className="border-t border-gray-100 h-16 flex justify-center items-center bg-white">
      <HStack className="content-center justify-between mx-auto" style={{ width: '90%', maxWidth: 270 }}>
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
                className={`${currentRoute === tab.id
                  ? "text-typography-900"
                  : "text-typography-400"
                  }`}
              />
              <Text
                size="xs"
                className={`${currentRoute === tab.id
                  ? "text-typography-900 font-bold"
                  : "text-typography-400"
                  }`}
                style={{ paddingTop: 5 }}
              >
                {tab.label}
              </Text>
            </VStack>
          </Pressable>
        ))}
      </HStack>
    </View>
  );
};

export default BottomNavigationView;
