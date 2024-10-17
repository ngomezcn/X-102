import React, { useEffect } from "react";
import { Box } from '@/components/ui/box';
import BottomNavigationView from "@/app/navigation/BottomNavigation";

import { NavigationTabs } from '@/app/navigation/NavigationTabs'
import { NavigationContainer } from '@react-navigation/native';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { StatusBar } from "@/components/ui/status-bar";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "@/global.css";
import * as Linking from "expo-linking";
import HomestayPage from "./AppContainer";
let defaultTheme: "dark" | "light" = "light";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccessScreen from "./screens/AccessScreen";
import AddScreen from "./screens/add/AddScreen";
import { navigationRef } from './navigation/RootNavigation';
import SetDeviceInfoScreen from "./screens/add/steps/SetDeviceInfoScreen";
import * as RootNavigation from '@/app/navigation/RootNavigation';
import PairDeviceScreen from "./screens/add/steps/PairDeviceScreen";

const Stack = createNativeStackNavigator();

const AppContainer = () => {
  const [colorMode, setColorMode] = React.useState<"dark" | "light">(
    defaultTheme
  );

  return (
    <GluestackUIProvider mode={colorMode}>

      <SafeAreaView style={{ flex: 1, paddingTop: 15 }}> 

        <NavigationContainer ref={navigationRef} independent={true}>
          <Stack.Navigator
            initialRouteName={NavigationTabs.Access}

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
          
        </NavigationContainer>
        <Box className="h-[72px] items-center w-full flex md:hidden border-t border-outline-50">
            <BottomNavigationView />
          </Box>
      </SafeAreaView>

    </GluestackUIProvider>
  );
};
export default AppContainer;

