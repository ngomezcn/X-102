import React, { useContext } from "react";

import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { bottomTabs, TabLabels } from  './NavigationTabs'; // Adjust the import path
import { useNavigation } from '@react-navigation/native';
import {ParamListBase } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { useNavigationState } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const BottomNavigationView = () => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const xd = ""

  return (
    <HStack className="content-center absolute bottom-0 justify-between w-full py-3 px-6 md:hidden">
      {bottomTabs.map((tab) => {
        return (
          <Pressable
            key={tab.label}
            onPress={() => {

              if (!tab.disabled) {
                navigation.navigate(TabLabels.Add);

                console.log(tab.label)
              }
            }}
            disabled={tab.disabled}
                          //@ts-ignore
            opacity={tab.disabled ? 0.5 : 1} // Use opacity directly
          >
            <VStack className="items-center">
              <Icon
                as={tab.icon}
                size="lg"
                className={`${
                  TabLabels.Add === tab.label
                    ? "text-typography-900"
                    : "text-typography-400"
                }`}
              />
              <Text
                size="xs"
                className={`${
                  TabLabels.Add === tab.label
                    ? "text-typography-900"
                    : "text-typography-400"
                }`}
              >
                {tab.label}
              </Text>
            </VStack>
          </Pressable>
        );
      })}
    </HStack>
  );
};

export default BottomNavigationView;
