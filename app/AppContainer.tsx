import React, { useEffect } from "react";
import { Box } from '@/components/ui/box';
import BottomNavigationView from "@/components/navigation/BottomNavigation";

import { AppRoutes } from '@/constants/AppRoutes'
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
import Access from "./(main)/Access";
import AddScreen from "./(main)/Add";
import SetDeviceInfoScreen from "./(main)/SetDeviceInfoScreen";
import NavigationService from "../services/NavigationService";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const AppContainer = () => {
  const [colorMode, setColorMode] = React.useState<"dark" | "light">(
    defaultTheme
  );

  NavigationService.navigate(AppRoutes.Access)

  return (
    <>
      <GluestackUIProvider mode={colorMode}>

        <StatusBar style="dark" backgroundColor="#fff" />

        <NavigationContainer ref={NavigationService.getRef()} independent={true}>

          <SafeAreaView style={{ flex: 1, paddingTop: 15 }}>

            <Stack.Navigator
              initialRouteName={AppRoutes.Access}

              screenOptions={{
                headerShown: false,
                header: () => null,
                contentStyle: { backgroundColor: 'white' },
              }}>

              <Stack.Screen name={AppRoutes.Access} component={Access} />

              <Stack.Screen name={AppRoutes.Add} component={AddScreen} />
              <Stack.Screen name={AppRoutes.SetDeviceInfoScreen} component={SetDeviceInfoScreen} />

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

