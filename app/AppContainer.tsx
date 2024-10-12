import React, { useEffect } from "react";
import { StatusBar, Platform } from "react-native";
import { Box } from '@/components/ui/box';
import BottomNavigationView from "@/app/navigation/BottomNavigation";

import { NavigationTabs } from '@/app/navigation/NavigationTabs'
import { NavigationContainer } from '@react-navigation/native';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "@/global.css";
import * as Linking from "expo-linking";
import HomestayPage from "./AppContainer";
let defaultTheme: "dark" | "light" = "light";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccessScreen from "./screens/access/AccessScreen";
import AddScreen from "./screens/add/AddScreen";
import { navigationRef } from './navigation/RootNavigation';
import SetDeviceInfoScreen from "./screens/add/steps/SetDeviceInfoScreen";
import * as RootNavigation from '@/app/navigation/RootNavigation';
import PairDeviceScreen from "./screens/add/steps/PairDeviceScreen";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "accessscreen",
};

const Stack = createNativeStackNavigator();

const AppContainer = () => {
  const [colorMode, setColorMode] = React.useState<"dark" | "light">(
    defaultTheme
  );

  return (
    <>
      <SafeAreaView className={`${colorMode === "light" ? "bg-[#E5E5E5]" : "bg-[#262626]"}`} />
      <GluestackUIProvider mode={colorMode}>

        <StatusBar
          barStyle={colorMode === "dark" ? "light-content" : "dark-content"}
          backgroundColor={colorMode === "dark" ? "#171717" : "#E5E5E5"} />

        <NavigationContainer ref={navigationRef} independent={true}>

          <SafeAreaView className={`${colorMode === "light" ? "bg-white" : "bg-[#171717]"} flex-1 overflow-hidden`}>

            <Stack.Navigator
              //initialRouteName={NavigationTabs.Access}
              initialRouteName={NavigationTabs.SetDeviceInfoScreen}

              screenOptions={{
                headerShown: false,
                header: () => null,
                contentStyle: { backgroundColor: 'white' },
              }}>

              <Stack.Screen name={NavigationTabs.Access} component={AccessScreen} />

              <Stack.Screen name={NavigationTabs.Add} component={AddScreen} />
              <Stack.Screen name={NavigationTabs.SetDeviceInfoScreen} component={SetDeviceInfoScreen} />
              <Stack.Screen name={NavigationTabs.PairDeviceScreen} component={PairDeviceScreen} />

            </Stack.Navigator>

            <Box className="h-[72px] items-center w-full flex md:hidden border-t border-outline-50">
              <BottomNavigationView />
            </Box>

          </SafeAreaView>
        </NavigationContainer>
      </GluestackUIProvider>
    </>
  );
};
export default AppContainer;

